export const themesApi = "/api/themes";

export async function getThemes() {
  const response = await fetch(themesApi, { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Create Auth Error: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}
