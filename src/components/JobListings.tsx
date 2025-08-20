import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number | null;
}

interface Profile {
  user_id: string;
  full_name: string;
  email: string;
}

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applying, setApplying] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setJobs(data || []);
      setLoading(false);
    };
    fetchJobs();

    // Real-time updates
    const channel = supabase
      .channel('jobs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, payload => {
        fetchJobs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Get current user profile
    supabase.auth.getUser().then(async ({ data }) => {
      if (data?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();
        setProfile(profileData || null);
      }
    });
  }, []);

  const handleApply = async (jobId: string) => {
    if (!profile) return;
    setApplying(jobId);
    await supabase.from("applications").insert([
      { worker_id: profile.user_id, job_id: jobId }
    ]);
    setApplying(null);
    alert("Application submitted!");
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobs.length === 0) return <p>No jobs available</p>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-3xl font-bold mb-4">Available Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>
            <p className="text-sm text-gray-500">
              {job.category} • {job.location} {job.budget != null ? `• ₹${job.budget}` : ''}
            </p>
            {profile && (
              <button
                className="mt-2 px-4 py-2 bg-primary text-white rounded"
                disabled={applying === job.id}
                onClick={() => handleApply(job.id)}
              >
                {applying === job.id ? "Applying..." : "Apply"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
