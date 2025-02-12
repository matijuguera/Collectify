import { NextResponse } from "next/server";
import { currentThemeService } from "../../services/ThemeService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const themeService = currentThemeService;

  try {
    const theme = await themeService.get(id);
    if (!theme) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(theme);
  } catch (error) {
    return NextResponse.json(
      { error: `Error getting theme: ${(error as Error).message}` },
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
    const name = formData.get("name") as string | null;
    const photo = formData.get("photo") as File | null;
    const themeService = currentThemeService;

    const existingTheme = await themeService.get(id);
    if (!existingTheme) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    let updatedName = existingTheme.name;
    let updatedPhoto: Uint8Array | null = existingTheme.photo ?? null;

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

    const updatedTheme = await themeService.update(
      id,
      updatedName,
      updatedPhoto
    );
    return NextResponse.json(updatedTheme);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating theme: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const themeService = currentThemeService;

  try {
    const existingTheme = await themeService.get(id);
    if (!existingTheme) {
      return NextResponse.json({}, { status: 404 });
    }

    await themeService.delete(id);

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting theme: ${(error as Error).message}` },
      { status: 404 }
    );
  }
}
