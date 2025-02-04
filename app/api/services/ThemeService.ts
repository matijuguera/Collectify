import { IThemeRepository } from "../repositories/Theme";

export default class ThemeService {
  constructor(private themeRepository: IThemeRepository) {}

  async create(name: string, photo: Uint8Array<ArrayBufferLike>) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!photo) {
      throw new Error("Photo is required");
    }

    return this.themeRepository.create(name, photo);
  }
}
