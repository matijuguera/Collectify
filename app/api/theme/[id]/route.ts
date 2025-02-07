import { NextResponse } from "next/server";
import { PrismaThemeRepository } from "../../repositories/Theme";
import ThemeService from "../../services/ThemeService";

export async function GET(
  request: Request,
  { params }:  { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const themeService = new ThemeService(new PrismaThemeRepository());

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
}}


export async function PUT(
  request: Request,
  { params }:  { params: Promise<{ id: string }> }
) {
  const { id } =  await params;
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const photo = formData.get("photo") as File;

  if (!name && !photo) {
    return NextResponse.json({ error: "Name or photo is required" }, { status: 400 });
  }

  const arrayBuffer = await photo.arrayBuffer();
  const uint8ArrayPhoto = new Uint8Array(arrayBuffer);

  const themeService = new ThemeService(new PrismaThemeRepository());

  try {
    const theme = await themeService.update(id, name, uint8ArrayPhoto);
    return NextResponse.json(theme);
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating theme: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }:  { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const themeService = new ThemeService(new PrismaThemeRepository());

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