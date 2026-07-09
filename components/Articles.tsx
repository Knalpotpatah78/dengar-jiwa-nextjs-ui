"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { articlesApi, type Article } from "@/lib/api";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articlesApi.getAll().then(setArticles).catch(() => {});
  }, []);

  if (articles.length === 0) return null;
  return (
    <section id="artikel" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Tips & Informasi Kesehatan Mental
            </h2>
            <p className="mt-2 text-muted">
              Artikel bermanfaat untuk mendukung perjalanan kesehatan mental Anda.
            </p>
          </div>
          <button className="rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5">
            Lihat Semua Artikel
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-peach px-3 py-1 text-xs font-medium text-primary">
                  {article.category}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime} baca</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
