import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, User as AuthUser } from "@/utils/auth";
import { supabase } from "@/lib/supabaseClient";

type WorkerInfo = {
  full_name?: string;
  email?: string;
  user_id?: string;
};

type Application = {
  id: string;
  status: "applied" | "shortlisted" | "rejected" | "withdrawn" | "accepted";
  created_at: string;
  worker?: WorkerInfo | null;
};

type JobWithApplications = {
  id: string;
  title: string;
  description: string;
  status: "open" | "assigned" | "completed" | "cancelled";
  applications: Application[];
};

const Applications = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchJobs = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, description, status, applications(id, status, created_at, worker:worker_id(full_name, email, user_id))")
      .eq("posted_by", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load applications", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const mapped: JobWithApplications[] = (data as any[]).map((j) => ({
      id: j.id,
      title: j.title,
      description: j.description,
      status: j.status,
      applications: (j.applications || []).map((a: any) => ({
        id: a.id,
        status: a.status,
        created_at: a.created_at,
        worker: a.worker || null,
      })),
    }));
    setJobs(mapped);
    setLoading(false);
  };

  useEffect(() => {
    const current = getCurrentUser();
    if (current?.userType !== "customer") {
      setUser(null);
      return;
    }
    setUser(current);
  }, []);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const acceptApplication = async (jobId: string, applicationId: string, workerId?: string) => {
    if (!workerId) {
      toast({ title: "Missing worker id", variant: "destructive" });
      return;
    }
    // Assign job to worker and set status to assigned
    const { error: jobErr } = await supabase
      .from("jobs")
      .update({ assigned_to: workerId, status: "assigned" })
      .eq("id", jobId);
    if (jobErr) {
      toast({ title: "Failed to assign job", description: jobErr.message, variant: "destructive" });
      return;
    }
    // Mark this application as accepted
    const { error: appErr } = await supabase
      .from("applications")
      .update({ status: "accepted" })
      .eq("id", applicationId);
    if (appErr) {
      toast({ title: "Failed to update application", description: appErr.message, variant: "destructive" });
      return;
    }
    // Reject all other applications for the same job that are still applied
    await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("job_id", jobId)
      .neq("id", applicationId)
      .in("status", ["applied", "shortlisted"]);

    toast({ title: "Application accepted", description: "Worker has been assigned to this job." });
    fetchJobs();
  };

  const rejectApplication = async (applicationId: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", applicationId);
    if (error) {
      toast({ title: "Failed to reject application", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application rejected" });
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-muted-foreground">Review and manage applications for your posted jobs</p>
          </div>

          {loading ? (
            <p>Loading applications...</p>
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                You haven’t posted any jobs yet.
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{job.description}</p>
                    </div>
                    <Badge>{job.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {job.applications.length === 0 ? (
                    <p className="text-muted-foreground">No applications yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {job.applications.map((app) => (
                        <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-md p-3">
                          <div>
                            <div className="font-medium">{app.worker?.full_name || app.worker?.email || "Unknown worker"}</div>
                            <div className="text-sm text-muted-foreground">Applied on {new Date(app.created_at).toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{app.status}</Badge>
                            {job.status === "open" && (
                              <>
                                <Button size="sm" onClick={() => acceptApplication(job.id, app.id, app.worker?.user_id)}>
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => rejectApplication(app.id)}>
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;


