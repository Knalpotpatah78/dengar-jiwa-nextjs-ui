import { apiError, apiSuccess } from "@/lib/api/server";
import { testimonialsStore } from "@/lib/api/store/testimonials";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  const data = all
    ? testimonialsStore.getAll()
    : testimonialsStore.getPublished();

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { text, name, service, avatar, published = true, order = 0 } = body;

  if (!text || !name || !service) {
    return apiError("Data testimoni tidak lengkap", 422, "VALIDATION_ERROR");
  }

  const id = String(Date.now());
  const testimonial = testimonialsStore.create({
    id,
    text,
    name,
    service,
    avatar: avatar || "",
    published: Boolean(published),
    order: Number(order) || 0,
  });

  return apiSuccess(testimonial, "Testimoni berhasil ditambahkan", 201);
}
