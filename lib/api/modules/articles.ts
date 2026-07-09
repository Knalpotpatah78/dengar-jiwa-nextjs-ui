import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  published: boolean;
}

export type CreateArticlePayload = Omit<Article, "id">;
export type UpdateArticlePayload = Partial<CreateArticlePayload>;

export const articlesApi = {
  getAll: (all = false) =>
    api.get<Article[]>(ENDPOINTS.articles.list, {
      params: all ? { all: "true" } : undefined,
    }),

  getById: (id: string) => api.get<Article>(ENDPOINTS.articles.detail(id)),

  create: (payload: CreateArticlePayload) =>
    api.post<Article>(ENDPOINTS.articles.list, payload),

  update: (id: string, payload: UpdateArticlePayload) =>
    api.put<Article>(ENDPOINTS.articles.detail(id), payload),

  delete: (id: string) => api.delete<void>(ENDPOINTS.articles.detail(id)),
};
