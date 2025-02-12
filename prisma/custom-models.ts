import { Theme } from "@prisma/client";

type Base64Photo = { photoBase64: string };

export type ThemeWithPhoto = Theme & Base64Photo;
