"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "./icons";
import { psychologistsApi } from "@/lib/api";
import type { Psychologist } from "@/lib/data";

export default function Psychologists() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);

  useEffect(() => {
    psychologistsApi.getAll().then(setPsychologists).catch(() => {});
  }, []);

  if (psychologists.length === 0) return null;
  return (
    <section id="psikolog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Psikolog Profesional & Berpengalaman
            </h2>
            <p className="mt-2 text-muted">
              Tim ahli kami siap mendampingi perjalanan kesehatan mental Anda.
            </p>
          </div>
          <Link
            href="/booking"
            className="rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {psychologists.map((psych) => (
            <div
              key={psych.id}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={psych.image}
                  alt={psych.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {psych.name}
                </h3>
                <p className="text-sm text-primary">{psych.title}</p>
                <p className="mt-2 text-xs text-muted">{psych.experience}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <StarIcon className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-foreground">
                    {psych.rating}
                  </span>
                  <span className="text-xs text-muted">({psych.reviews} ulasan)</span>
                </div>
                <Link
                  href={`/booking?psychologist=${psych.id}&service=${psych.specialties[0]}`}
                  className="mt-4 block w-full rounded-xl border border-primary py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Booking
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
