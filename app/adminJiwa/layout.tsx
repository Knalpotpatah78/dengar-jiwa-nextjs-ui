import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Dengar Jiwa",
  description: "Login panel administrasi Dengar Jiwa",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
