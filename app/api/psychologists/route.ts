import { psychologistsStore } from "@/lib/api/store/psychologists";
import { apiError, apiSuccess } from "@/lib/api/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("service");

  const data = serviceId
    ? psychologistsStore.getForService(serviceId)
    : psychologistsStore.getAll();

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, name, title, experience, rating, reviews, image, specialties, bio } =
    body;

  if (!name || !title) {
    return apiError("Data psikolog tidak lengkap", 422, "VALIDATION_ERROR");
  }

  const psychologistId =
    id || name.toLowerCase().replace(/\s+/g, "-").slice(0, 30);

  if (psychologistsStore.getById(psychologistId)) {
    return apiError("ID psikolog sudah digunakan", 409, "DUPLICATE");
  }

  const psychologist = psychologistsStore.create({
    id: psychologistId,
    name,
    title,
    experience: experience || "",
    rating: Number(rating) || 5,
    reviews: Number(reviews) || 0,
    image: image || "",
    specialties: Array.isArray(specialties) ? specialties : [],
    bio: bio || "",
  });

  return apiSuccess(psychologist, "Psikolog berhasil ditambahkan", 201);
}
