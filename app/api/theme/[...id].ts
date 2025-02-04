import { NextResponse } from "next/server";
import { PrismaThemeRepository } from "../repositories/Theme";
import ThemeService from "../services/ThemeService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const themeService = new ThemeService(new PrismaThemeRepository());
  const theme = await themeService.get(id);
  if (theme === null) { return NextResponse.json({},{status : 404}); }
  return NextResponse.json(theme);
}
