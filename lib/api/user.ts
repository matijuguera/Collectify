type CreateUserPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export async function createUser({
  email,
  password,
  confirmPassword,
  termsAccepted,
}: CreateUserPayload) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      termsAccepted: termsAccepted,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Create Auth Error: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}

export async function verifyEmail(token: string) {
  const response = await fetch("/api/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Verify email Error: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch("/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Forgot password Error: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}

export async function updatePassword(
  token: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      password,
      confirmPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Update password Error: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}
