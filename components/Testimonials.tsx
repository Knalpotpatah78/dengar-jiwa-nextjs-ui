"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "./icons";
import { testimonialsApi, type Testimonial } from "@/lib/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    testimonialsApi.getAll().then(setTestimonials).catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const testimonial = testimonials[current];

  return (
    <section className="bg-beige py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Cerita Perubahan dari Mereka
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Dengarkan pengalaman klien yang telah memulai perjalanan kesehatan mental bersama kami.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
            <QuoteIcon className="mx-auto text-primary" />
            <p className="mt-6 text-center text-base leading-relaxed text-muted sm:text-lg">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-serif font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted">{testimonial.service}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
