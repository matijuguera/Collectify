import prisma from "@/prismadb";
import { PhotoManager } from "../lib/photo-manager";
import { PrismaThemeRepository } from "../repositories/Theme";
import ThemeService from "./ThemeService";

describe("ThemeService.create", () => {
  const themeRepository = new PrismaThemeRepository();

  const themeService = new ThemeService(themeRepository, new PhotoManager());

  beforeEach(async () => {
    await prisma.theme.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  /**
   * Given: Valid theme with name and photo
   * When: Creating the theme
   * Then: The theme should be created successfully
   */
  it("should create the theme successfully", async () => {
    const theme = await themeService.create("Test Theme", new Uint8Array());

    expect(theme?.name).toBe("Test Theme");
  });
});
