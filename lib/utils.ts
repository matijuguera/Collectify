import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fileToUint8Array(filePath: string): Promise<Uint8Array> {
  const url = `${process.env.PUBLIC_URL || ""}${filePath}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
