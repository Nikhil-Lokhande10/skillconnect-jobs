import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentUser } from "@/utils/auth";

export default function AddJobForm({ onJobAdded }: { onJobAdded?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    salary: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const current = getCurrentUser();
    await supabase.from("jobs").insert([
      {
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        budget: Number(form.salary),
        posted_by: current?.id ?? null
      }
    ]);
    setLoading(false);
    setForm({ title: "", description: "", category: "", location: "", salary: "" });
    if (onJobAdded) onJobAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 border rounded mb-8">
      <h3 className="text-xl font-bold mb-4">Post a Job</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="mb-2 w-full p-2 border rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="mb-2 w-full p-2 border rounded" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="mb-2 w-full p-2 border rounded" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="mb-2 w-full p-2 border rounded" />
      <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" required type="number" className="mb-2 w-full p-2 border rounded" />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
