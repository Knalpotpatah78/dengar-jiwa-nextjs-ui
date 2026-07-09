export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: string;
}

export interface Psychologist {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
  bio: string;
}

export const services: Service[] = [
  {
    id: "individu",
    name: "Konsultasi Individu",
    description:
      "Sesi one-on-one untuk membahas masalah pribadi, kecemasan, stres, atau pengembangan diri.",
    price: 350000,
    duration: 60,
    icon: "user",
  },
  {
    id: "pasangan",
    name: "Terapi Pasangan",
    description:
      "Konseling untuk pasangan yang ingin memperbaiki komunikasi dan memperkuat hubungan.",
    price: 500000,
    duration: 90,
    icon: "heart",
  },
  {
    id: "anak",
    name: "Konseling Anak",
    description:
      "Pendampingan khusus untuk anak dan remaja menghadapi tantangan emosional dan perilaku.",
    price: 400000,
    duration: 60,
    icon: "child",
  },
  {
    id: "assessment",
    name: "Assessment Psikologi",
    description:
      "Evaluasi psikologis komprehensif dengan laporan dan rekomendasi tindak lanjut.",
    price: 750000,
    duration: 120,
    icon: "clipboard",
  },
];

export const psychologists: Psychologist[] = [
  {
    id: "sarah",
    name: "Dr. Sarah Wijaya",
    title: "Psikolog Klinis",
    experience: "8 Tahun Pengalaman",
    rating: 4.9,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    specialties: ["individu", "assessment"],
    bio: "Spesialis kecemasan, depresi, dan manajemen stres dengan pendekatan CBT.",
  },
  {
    id: "ahmad",
    name: "Dr. Ahmad Rizki",
    title: "Psikolog Klinis",
    experience: "10 Tahun Pengalaman",
    rating: 4.8,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    specialties: ["individu", "pasangan"],
    bio: "Berpengalaman menangani trauma dan gangguan mood dengan pendekatan integratif.",
  },
  {
    id: "maya",
    name: "Dr. Maya Sari",
    title: "Psikolog Anak",
    experience: "6 Tahun Pengalaman",
    rating: 4.9,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    specialties: ["anak", "individu"],
    bio: "Ahli perkembangan anak dan remaja, play therapy, dan konseling keluarga.",
  },
  {
    id: "budi",
    name: "Dr. Budi Santoso",
    title: "Psikolog Pasangan",
    experience: "12 Tahun Pengalaman",
    rating: 5.0,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    specialties: ["pasangan", "individu"],
    bio: "Fokus pada terapi pasangan, pranikah, dan resolusi konflik keluarga.",
  },
];

export const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const paymentMethods = [
  { id: "transfer", name: "Transfer Bank", description: "BCA, Mandiri, BNI" },
  { id: "gopay", name: "GoPay", description: "Bayar via aplikasi GoPay" },
  { id: "ovo", name: "OVO", description: "Bayar via aplikasi OVO" },
  { id: "qris", name: "QRIS", description: "Scan QR untuk pembayaran" },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr + "T00:00:00"));
}

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}

export function getPsychologistById(id: string) {
  return psychologists.find((p) => p.id === id);
}

export function getPsychologistsForService(serviceId: string) {
  return psychologists.filter((p) => p.specialties.includes(serviceId));
}

export function generateBookingId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `DJ-${num}`;
}
