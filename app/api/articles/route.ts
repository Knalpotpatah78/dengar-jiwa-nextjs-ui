import { apiError, apiSuccess } from "@/lib/api/server";
import { articlesStore } from "@/lib/api/store/articles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  const data = all ? articlesStore.getAll() : articlesStore.getPublished();

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    slug,
    excerpt,
    content,
    category,
    date,
    readTime,
    image,
    published = true,
  } = body;

  if (!title || !excerpt || !category) {
    return apiError("Data artikel tidak lengkap", 422, "VALIDATION_ERROR");
  }

  const id = String(Date.now());
  const article = articlesStore.create({
    id,
    title,
    slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
    excerpt,
    content: content || excerpt,
    category,
    date: date || new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: readTime || "5 menit",
    image: image || "",
    published: Boolean(published),
  });

  return apiSuccess(article, "Artikel berhasil ditambahkan", 201);
}
