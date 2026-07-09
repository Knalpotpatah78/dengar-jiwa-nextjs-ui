export const ADMIN_COOKIE = "admin_session";

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@dengarjiwa.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

export const ADMIN_SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN || "dj-admin-authenticated";

export function verifyAdminCredentials(email: string, password: string) {
  return (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  );
}

export function isValidAdminSession(token: string | undefined) {
  return token === ADMIN_SESSION_TOKEN;
}
