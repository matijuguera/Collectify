import { NextResponse } from "next/server";
import { PrismaThemeRepository } from "../repositories/Theme";
import ThemeService from "../services/ThemeService";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const photo = formData.get("photo") as File;

  const arrayBuffer = await photo.arrayBuffer();
  const uint8ArrayPhoto = new Uint8Array(arrayBuffer);

  const themeService = new ThemeService(new PrismaThemeRepository());

  try {
    const theme = await themeService.create(name, uint8ArrayPhoto);
    return NextResponse.json(theme, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function GET() {
  const themeService = new ThemeService(new PrismaThemeRepository());
  const themes = await themeService.list();
  return NextResponse.json(themes);
}
