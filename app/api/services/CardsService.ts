import { Card } from "@prisma/client";
import { ICardRepository } from "../repositories/Cards";

export class CardService {
  constructor(private cardRepository: ICardRepository) {}

  async createCard(
    identifier: string,
    name: string,
    photo: Uint8Array | null,
    set_id: string
  ): Promise<Card> {
    return this.cardRepository.create(identifier, name, photo, set_id);
  }

  async listCards(
    searchParams: {
      themeName?: string;
      setName?: string;
      cardIdentifier?: string;
    },
    skip: number,
    take: number
  ): Promise<Card[]> {
    return this.cardRepository.list(searchParams, skip, take);
  }

  async getCard(id: string): Promise<Card | null> {
    return this.cardRepository.get(id);
  }

  async updateCard(
    id: string,
    identifier?: string,
    name?: string,
    photo?: Uint8Array | null
  ): Promise<Card> {
    return this.cardRepository.update(id, identifier, name, photo);
  }

  async deleteCard(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
