import { NextResponse } from "next/server";
import { CardRepository } from "../repositories/Cards";
import { CardService } from "../services/CardsService";

const cardService = new CardService(new CardRepository());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const themeName = searchParams.get("themeName") || undefined;
  const setName = searchParams.get("setName") || undefined;
  const cardIdentifier = searchParams.get("cardIdentifier") || undefined;
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "10");

  try {
    const cards = await cardService.listCards(
      { themeName, setName, cardIdentifier },
      skip,
      take
    );
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching cards: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const identifier = formData.get("identifier") as string;
    const name = formData.get("name") as string;
    const photo = formData.get("photo") as File;
    const set_id = formData.get("set_id") as string;

    if (!identifier || !name || !photo || !set_id) {
      return NextResponse.json(
        { error: "Identifier, name, photo, and set_id are required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await photo.arrayBuffer();
    const photoBuffer = Buffer.from(arrayBuffer);

    const card = await cardService.createCard(
      identifier,
      name,
      photoBuffer,
      set_id
    );
    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating card: " + (error as Error).message },
      { status: 500 }
    );
  }
}
