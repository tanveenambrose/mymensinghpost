"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const categories = [
  "সর্বশেষ",
  "জাতীয়",
  "রাজনৈতিক",
  "অর্থনীতি",
  "আন্তর্জাতিক",
  "সারাদেশ",
  "খেলা",
  "বিনোদন",
  "ভ্রমণ",
];

interface FormState {
  title: string;
  datePlace: string;
  category: string;
  description: string;
}

export default function SubmitNewsPage() {
  const [form, setForm] = useState<FormState>({
    title: "",
    datePlace: "",
    category: "",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title || !form.datePlace || !form.category || !form.description) {
      setError("সব তথ্য পূরণ করুন।");
      return;
    }
    setSubmitting(true);
    try {
      // Save news data to Firestore without photos
      await addDoc(collection(db, "news"), {
        title: form.title,
        datePlace: form.datePlace,
        category: form.category,
        description: form.description,
        createdAt: Timestamp.now(),
        status: "pending", // for moderation, if needed
      });
      setSuccess("সংবাদটি জমা হয়েছে!");
      setForm({ title: "", datePlace: "", category: "", description: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[var(--card)] rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">সংবাদ জমা দিন</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-[var(--foreground)]">সংবাদের শিরোনাম *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring"
            required
            title="সংবাদের শিরোনাম"
            placeholder="সংবাদের শিরোনাম লিখুন"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-[var(--foreground)]">তারিখ ও স্থান *</label>
          <input
            type="text"
            name="datePlace"
            value={form.datePlace}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring"
            required
            title="তারিখ ও স্থান"
            placeholder="তারিখ ও স্থান লিখুন"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-[var(--foreground)]">বিভাগ *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring"
            required
            title="বিভাগ"
          >
            <option value="">-- নির্বাচন করুন --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-[var(--foreground)]">সংবাদের বিবরণ *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring"
            required
            title="সংবাদের বিবরণ"
            placeholder="সংবাদের বিবরণ লিখুন"
          />
        </div>
        {error && <div className="text-red-500 font-medium">{error}</div>}
        {success && <div className="text-green-600 font-medium">{success}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-primary text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "জমা হচ্ছে..." : "জমা দিন"}
        </button>
      </form>
    </div>
  );
}
