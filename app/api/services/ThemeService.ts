import { Theme } from "@prisma/client";
import { PhotoManager } from "../lib/photo-manager";
import { IThemeRepository, PrismaThemeRepository } from "../repositories/Theme";

export default class ThemeService {
  constructor(
    private themeRepository: IThemeRepository,
    private photoManager: PhotoManager
  ) {}

  async create(name: string, photo: Uint8Array<ArrayBufferLike>) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!photo) {
      throw new Error("Photo is required");
    }

    return this.photoManager.addPhotoBase64ToObject(
      await this.themeRepository.create(name, photo)
    ) as unknown as Theme;
  }

  async list() {
    return this.photoManager.addPhotoBase64ToObjects(
      await this.themeRepository.list()
    ) as unknown as Theme[];
  }

  async get(id: string) {
    return this.photoManager.addPhotoBase64ToObject(
      await this.themeRepository.get(id)
    ) as unknown as Theme;
  }

  async update(id: string, name: string, photo: Uint8Array<ArrayBufferLike>) {
    return this.photoManager.addPhotoBase64ToObject(
      await this.themeRepository.update(id, name, photo)
    ) as unknown as Theme;
  }

  async delete(id: string) {
    return this.themeRepository.delete(id);
  }
}

export const currentThemeService = new ThemeService(
  new PrismaThemeRepository(),
  new PhotoManager()
);
