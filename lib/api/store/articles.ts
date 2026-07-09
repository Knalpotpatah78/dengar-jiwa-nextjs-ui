import type { Article } from "@/lib/api/modules/articles";

const seedArticles: Article[] = [
  {
    id: "1",
    slug: "5-cara-mengelola-stres-di-tempat-kerja",
    title: "5 Cara Mengelola Stres di Tempat Kerja",
    excerpt:
      "Pelajari strategi praktis untuk menjaga keseimbangan mental saat menghadapi tekanan pekerjaan.",
    content:
      "Stres di tempat kerja adalah hal yang umum dialami. Artikel ini membahas lima strategi praktis untuk mengelola stres, mulai dari manajemen waktu hingga teknik relaksasi sederhana.",
    category: "Kesehatan Mental",
    date: "5 Juli 2026",
    readTime: "5 menit",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    published: true,
  },
  {
    id: "2",
    slug: "mengenal-tanda-tanda-burnout",
    title: "Mengenal Tanda-Tanda Burnout dan Cara Mengatasinya",
    excerpt:
      "Burnout bukan sekadar kelelahan. Kenali gejalanya sebelum berdampak pada kesehatan mental Anda.",
    content:
      "Burnout adalah kondisi kelelahan emosional, fisik, dan mental akibat stres berkepanjangan. Kenali tanda-tandanya dan langkah-langkah pencegahannya.",
    category: "Wellbeing",
    date: "2 Juli 2026",
    readTime: "7 menit",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    published: true,
  },
  {
    id: "3",
    slug: "pentingnya-self-care",
    title: "Pentingnya Self-Care untuk Kesehatan Mental",
    excerpt:
      "Self-care bukan egois — ini investasi penting untuk kesejahteraan emosional jangka panjang.",
    content:
      "Self-care adalah praktik menjaga kesehatan mental dan fisik secara sadar. Artikel ini menjelaskan mengapa self-care penting dan cara memulainya.",
    category: "Self-Care",
    date: "28 Juni 2026",
    readTime: "4 menit",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop",
    published: true,
  },
];

const articles = new Map<string, Article>(
  seedArticles.map((a) => [a.id, { ...a }])
);

export const articlesStore = {
  getAll: () => Array.from(articles.values()),
  getPublished: () =>
    Array.from(articles.values()).filter((a) => a.published),
  getById: (id: string) => articles.get(id),
  create: (article: Article) => {
    articles.set(article.id, article);
    return article;
  },
  update: (id: string, data: Partial<Article>) => {
    const existing = articles.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data, id };
    articles.set(id, updated);
    return updated;
  },
  delete: (id: string) => articles.delete(id),
};
