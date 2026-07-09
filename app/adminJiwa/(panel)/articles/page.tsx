"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { articlesApi, type Article } from "@/lib/api";
import AdminModal from "@/components/admin/AdminModal";
import StatusBadge from "@/components/admin/StatusBadge";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  date: "",
  readTime: "5 menit",
  image: "",
  published: true,
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await articlesApi.getAll(true);
      setArticles(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(a: Article) {
    setEditing(a);
    setForm({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      date: a.date,
      readTime: a.readTime,
      image: a.image,
      published: a.published,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await articlesApi.update(editing.id, form);
        setArticles((prev) =>
          prev.map((a) => (a.id === editing.id ? updated : a))
        );
      } else {
        const created = await articlesApi.create(form);
        setArticles((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch {
      alert("Gagal menyimpan artikel");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      await articlesApi.delete(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Gagal menghapus artikel");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Kelola Artikel</h1>
          <p className="mt-1 text-sm text-muted">
            Kelola artikel dan tips kesehatan mental
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          + Tambah Artikel
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted">
          Belum ada artikel. Tambahkan artikel pertama Anda.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.id}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative aspect-[3/2] bg-beige">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">
                    📝
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-peach px-2 py-0.5 text-xs font-medium text-primary">
                    {a.category}
                  </span>
                  <StatusBadge status={a.published} />
                </div>
                <h3 className="mt-2 font-serif text-base font-semibold leading-snug line-clamp-2">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {a.date} · {a.readTime} baca
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(a)}
                    className="rounded-lg border border-border px-3 py-1 text-xs font-medium hover:bg-beige"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Artikel" : "Tambah Artikel"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Judul" required>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              required
            />
          </Field>
          <Field label="Slug URL">
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="input-field"
              placeholder="auto-generated-jika-kosong"
            />
          </Field>
          <Field label="Kategori" required>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-field"
              placeholder="Kesehatan Mental"
              required
            />
          </Field>
          <Field label="Ringkasan" required>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="input-field min-h-[60px] resize-y"
              rows={2}
              required
            />
          </Field>
          <Field label="Konten">
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="input-field min-h-[100px] resize-y"
              rows={4}
            />
          </Field>
          <Field label="URL Gambar">
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal">
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-field"
                placeholder="5 Juli 2026"
              />
            </Field>
            <Field label="Waktu Baca">
              <input
                value={form.readTime}
                onChange={(e) =>
                  setForm({ ...form, readTime: e.target.value })
                }
                className="input-field"
                placeholder="5 menit"
              />
            </Field>
          </div>
          <Field label="Status">
            <select
              value={form.published ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, published: e.target.value === "true" })
              }
              className="input-field"
            >
              <option value="true">Dipublikasi</option>
              <option value="false">Draft</option>
            </select>
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-beige"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </AdminModal>

      <style jsx global>{`
        .input-field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
