import prisma from "@/prismadb";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaThemeRepository } from "../repositories/Theme";
import ThemeService from "./ThemeService";

describe("ThemeService.create", () => {
  const themeRepository = new PrismaThemeRepository();
  const themeService = new ThemeService(themeRepository);

  beforeEach(async () => {
    await prisma.theme.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create the theme successfully", async () => {
    const mockThemeData = {
      name: "Test Theme",
      image: new Uint8Array([1, 2, 3]),
    };

    const theme = await themeService.create(
      mockThemeData.name,
      mockThemeData.image
    );

    expect(theme).toBeDefined();
    expect(theme.name).toBe(mockThemeData.name);
    expect(theme.photo).toBeDefined();
  });
});
