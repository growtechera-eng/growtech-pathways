import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Simple in-memory types
type VideoItem = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  previewUrl: string; // object URL for local preview
  pricing: "free" | "paid";
  price?: number;
  createdAt: string;
};

type LiveClass = {
  id: string;
  title: string;
  startsAt: string; // ISO string
  joinUrl: string; // Zoom/Meet/custom room URL
  createdAt: string;
};

// Admin uses a user object in localStorage; mirror that approach here
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {} as any;
  }
}

function isTeacher() {
  const user = getUser();
  return user?.role === "TEACHER";
}

export default function Teacher() {
  // Video state
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [vTitle, setVTitle] = useState("");
  const [vDesc, setVDesc] = useState("");
  const [vFile, setVFile] = useState<File | null>(null);
  const [vPricing, setVPricing] = useState<"free" | "paid">("free");
  const [vPrice, setVPrice] = useState<string>("");

  // Live class state
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [cTitle, setCTitle] = useState("");
  const [cStartsAt, setCStartsAt] = useState("");
  const [cJoinUrl, setCJoinUrl] = useState("");

  const totalRevenue = useMemo(() =>
    videos.filter(v => v.pricing === "paid").reduce((sum, v) => sum + (v.price || 0), 0)
  , [videos]);

  const addVideo = () => {
    if (!vTitle || !vFile) return;
    if (vPricing === "paid" && (!vPrice || Number.isNaN(Number(vPrice)))) return;

    const previewUrl = URL.createObjectURL(vFile);

    const item: VideoItem = {
      id: crypto.randomUUID(),
      title: vTitle,
      description: vDesc,
      fileName: vFile.name,
      fileSize: vFile.size,
      fileType: vFile.type || "video/*",
      previewUrl,
      pricing: vPricing,
      price: vPricing === "paid" ? Number(vPrice) : undefined,
      createdAt: new Date().toISOString(),
    };
    setVideos(prev => [item, ...prev]);
    setVTitle(""); setVDesc(""); setVFile(null); setVPricing("free"); setVPrice("");
  };

  const scheduleClass = () => {
    if (!cTitle || !cStartsAt || !cJoinUrl) return;
    const item: LiveClass = {
      id: crypto.randomUUID(),
      title: cTitle,
      startsAt: new Date(cStartsAt).toISOString(),
      joinUrl: cJoinUrl,
      createdAt: new Date().toISOString(),
    };
    setClasses(prev => [item, ...prev]);
    setCTitle(""); setCStartsAt(""); setCJoinUrl("");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user?.role !== "TEACHER") {
      toast({
        title: "Access Denied",
        description: "You must be a teacher to access this page",
        variant: "destructive",
      });
      navigate("/");
      window.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }
  }, [navigate]);

  if (!isTeacher()) {
    return null;
  }

  return (
    <main className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Teacher Console</h1>
          <p className="text-muted-foreground">Create concept videos and schedule live classes for your students.</p>
        </div>
        <Button variant="outline" onClick={() => { localStorage.removeItem("user"); navigate("/"); }}>
          Log out
        </Button>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="live">Live Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Concept Video</CardTitle>
              <CardDescription>Publish free or paid content for students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="v-title">Title</Label>
                  <Input id="v-title" value={vTitle} onChange={(e) => setVTitle(e.target.value)} placeholder="Intro to Data Structures" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="v-file">Video File</Label>
                  <Input id="v-file" type="file" accept="video/*" onChange={(e) => setVFile(e.target.files?.[0] || null)} />
                  {vFile ? (
                    <div className="text-xs text-muted-foreground">
                      Selected: {vFile.name} • {(vFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Select a video file to upload</div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-desc">Description</Label>
                <Textarea id="v-desc" value={vDesc} onChange={(e) => setVDesc(e.target.value)} placeholder="What will students learn?" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Pricing</Label>
                  <Select value={vPricing} onValueChange={(v: "free" | "paid") => setVPricing(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="v-price">Price</Label>
                  <Input id="v-price" type="number" min={0} step="0.01" value={vPrice} onChange={(e) => setVPrice(e.target.value)} placeholder={vPricing === "paid" ? "9.99" : "Disabled for Free"} disabled={vPricing === "free"} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={addVideo}>Add Video</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Videos</CardTitle>
              <CardDescription>Manage your published content.</CardDescription>
            </CardHeader>
            <CardContent>
              {videos.length === 0 ? (
                <p className="text-muted-foreground">No videos yet. Add your first concept above.</p>
              ) : (
                <div className="space-y-4">
                  {videos.map(v => (
                    <div key={v.id} className="rounded-md border p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-medium">{v.title}</div>
                          <div className="text-sm text-muted-foreground">{v.description || "No description"}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{(v.fileSize / (1024 * 1024)).toFixed(2)} MB • {v.fileType}</div>
                          <a href={v.previewUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">Preview video</a>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {v.pricing === "free" ? "Free" : `Paid • $${v.price?.toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="text-right text-sm text-muted-foreground">Total potential revenue: ${totalRevenue.toFixed(2)}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Live Class</CardTitle>
              <CardDescription>Create a live session and share the join link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-title">Title</Label>
                  <Input id="c-title" value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="Live Q&A: Arrays" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-starts">Start time</Label>
                  <Input id="c-starts" type="datetime-local" value={cStartsAt} onChange={(e) => setCStartsAt(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-url">Join URL</Label>
                <Input id="c-url" value={cJoinUrl} onChange={(e) => setCJoinUrl(e.target.value)} placeholder="https://zoom.us/j/... or https://meet.google.com/..." />
              </div>
              <div className="flex justify-end">
                <Button onClick={scheduleClass}>Schedule Class</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Manage and start your sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              {classes.length === 0 ? (
                <p className="text-muted-foreground">No classes scheduled yet.</p>
              ) : (
                <div className="space-y-4">
                  {classes.map(c => (
                    <div key={c.id} className="rounded-md border p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-medium">{c.title}</div>
                          <div className="text-sm text-muted-foreground">Starts {new Date(c.startsAt).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={c.joinUrl} target="_blank" rel="noreferrer">
                            <Button>Start</Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
