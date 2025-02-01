const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
const auth0Token = process.env.AUTH0_ACCESS_TOKEN;

type CreateUserPayload = {
  email: string;
  password: string;
};

export async function createAuth0User({ email, password }: CreateUserPayload) {
  const response = await fetch(`${auth0Domain}/api/v2/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth0Token}`,
    },
    body: JSON.stringify({
      email,
      password,
      connection: "Username-Password-Authentication",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Auth0 Error: ${errorData.message || "Unknown error"}`);
  }

  return response.json();
}
