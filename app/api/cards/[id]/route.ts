import { NextResponse } from "next/server";
import { CardRepository } from "../../repositories/Cards";
import { CardService } from "../../services/CardsService";

const cardService = new CardService(new CardRepository());

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const card = await cardService.getCard(id);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    return NextResponse.json(card);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching card: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const formData = await request.formData();
    const identifier = formData.get("identifier") as string | null;
    const name = formData.get("name") as string | null;
    const photo = formData.get("photo") as File | null;

    const existingCard = await cardService.getCard(id);
    if (!existingCard) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    let updatedIdentifier = existingCard.identifier;
    let updatedName = existingCard.name;
    let updatedPhoto: Uint8Array | null = existingCard.photo;

    if (identifier !== null) {
      updatedIdentifier = identifier || "";
    }

    if (name !== null) {
      updatedName = name || "";
    }

    if (photo !== null) {
      if (!photo.size) {
        updatedPhoto = new Uint8Array();
      } else {
        const arrayBuffer = await photo.arrayBuffer();
        updatedPhoto = new Uint8Array(arrayBuffer);
      }
    }

    const updatedCard = await cardService.updateCard(
      id,
      updatedIdentifier,
      updatedName,
      updatedPhoto
    );
    return NextResponse.json(updatedCard);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating card: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await cardService.deleteCard(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting card: " + (error as Error).message },
      { status: 500 }
    );
  }
}
