"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonialsApi, type Testimonial } from "@/lib/api";
import AdminModal from "@/components/admin/AdminModal";
import StatusBadge from "@/components/admin/StatusBadge";

const emptyForm = {
  text: "",
  name: "",
  service: "",
  avatar: "",
  published: true,
  order: 0,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await testimonialsApi.getAll(true);
      setTestimonials(data);
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
    setForm({ ...emptyForm, order: testimonials.length + 1 });
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({
      text: t.text,
      name: t.name,
      service: t.service,
      avatar: t.avatar,
      published: t.published,
      order: t.order,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await testimonialsApi.update(editing.id, form);
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editing.id ? updated : t))
        );
      } else {
        const created = await testimonialsApi.create(form);
        setTestimonials((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch {
      alert("Gagal menyimpan testimoni");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      await testimonialsApi.delete(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Gagal menghapus testimoni");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Kelola Testimoni</h1>
          <p className="mt-1 text-sm text-muted">
            Kelola testimoni yang ditampilkan di halaman utama
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          + Tambah Testimoni
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted">
          Belum ada testimoni. Tambahkan testimoni pertama Anda.
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-beige text-lg">
                    👤
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.service}</p>
                  </div>
                  <StatusBadge status={t.published} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="rounded-lg border border-border px-3 py-1 text-xs font-medium hover:bg-beige"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
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
        title={editing ? "Edit Testimoni" : "Tambah Testimoni"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama Klien" required>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
            />
          </Field>
          <Field label="Layanan" required>
            <input
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="input-field"
              placeholder="Konsultasi Individu"
              required
            />
          </Field>
          <Field label="Testimoni" required>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="input-field min-h-[100px] resize-y"
              rows={4}
              required
            />
          </Field>
          <Field label="URL Avatar">
            <input
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Urutan">
              <input
                type="number"
                min={0}
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
                className="input-field"
              />
            </Field>
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
          </div>
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
