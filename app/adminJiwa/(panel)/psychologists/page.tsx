"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { psychologistsApi } from "@/lib/api";
import type { Psychologist } from "@/lib/data";
import { services } from "@/lib/data";
import AdminModal from "@/components/admin/AdminModal";

const emptyForm = {
  name: "",
  title: "",
  experience: "",
  rating: 5,
  reviews: 0,
  image: "",
  specialties: [] as string[],
  bio: "",
};

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Psychologist | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await psychologistsApi.getAll();
      setPsychologists(data);
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

  function openEdit(p: Psychologist) {
    setEditing(p);
    setForm({
      name: p.name,
      title: p.title,
      experience: p.experience,
      rating: p.rating,
      reviews: p.reviews,
      image: p.image,
      specialties: [...p.specialties],
      bio: p.bio,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const updated = await psychologistsApi.update(editing.id, form);
        setPsychologists((prev) =>
          prev.map((p) => (p.id === editing.id ? updated : p))
        );
      } else {
        const created = await psychologistsApi.create(form);
        setPsychologists((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch {
      alert("Gagal menyimpan data psikolog");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus psikolog ini?")) return;
    try {
      await psychologistsApi.delete(id);
      setPsychologists((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Gagal menghapus psikolog");
    }
  }

  function toggleSpecialty(serviceId: string) {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(serviceId)
        ? prev.specialties.filter((s) => s !== serviceId)
        : [...prev.specialties, serviceId],
    }));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Kelola Dokter</h1>
          <p className="mt-1 text-sm text-muted">
            Tambah, edit, dan hapus data psikolog
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          + Tambah Dokter
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {psychologists.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-beige text-2xl">
                    👨‍⚕️
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="text-sm text-primary">{p.title}</p>
                <p className="mt-1 text-xs text-muted">{p.experience}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.specialties.map((s) => {
                    const svc = services.find((sv) => sv.id === s);
                    return (
                      <span
                        key={s}
                        className="rounded-full bg-peach px-2 py-0.5 text-xs text-primary"
                      >
                        {svc?.name || s}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="rounded-lg border border-border px-3 py-1 text-xs font-medium hover:bg-beige"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
        title={editing ? "Edit Dokter" : "Tambah Dokter"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama Lengkap" required>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
            />
          </Field>
          <Field label="Jabatan / Gelar" required>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              placeholder="Psikolog Klinis"
              required
            />
          </Field>
          <Field label="Pengalaman">
            <input
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              className="input-field"
              placeholder="8 Tahun Pengalaman"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Rating">
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
                className="input-field"
              />
            </Field>
            <Field label="Jumlah Review">
              <input
                type="number"
                min={0}
                value={form.reviews}
                onChange={(e) =>
                  setForm({ ...form, reviews: Number(e.target.value) })
                }
                className="input-field"
              />
            </Field>
          </div>
          <Field label="URL Foto">
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </Field>
          <Field label="Spesialisasi">
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSpecialty(s.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    form.specialties.includes(s.id)
                      ? "bg-primary text-white"
                      : "border border-border text-muted hover:border-primary"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Bio">
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="input-field min-h-[80px] resize-y"
              rows={3}
            />
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
