import { Set } from "@prisma/client";
import { ISetRepository } from "../repositories/Sets";

export class SetService {
  constructor(private setRepository: ISetRepository) {}

  async createSet(
    name: string,
    photo: Uint8Array,
    theme_id: string
  ): Promise<Set> {
    return this.setRepository.create(name, photo, theme_id);
  }

  async listSets(): Promise<Set[]> {
    return this.setRepository.list();
  }

  async getSet(id: string): Promise<Set | null> {
    return this.setRepository.get(id);
  }

  async updateSet(id: string, name: string, photo: Uint8Array): Promise<Set> {
    return this.setRepository.update(id, name, photo);
  }

  async deleteSet(id: string): Promise<void> {
    await this.setRepository.delete(id);
  }
}
