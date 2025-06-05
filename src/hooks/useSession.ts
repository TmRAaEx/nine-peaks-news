import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/ApiClient";

export default function useSession(redirectIfUnauthorized = true) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await apiClient.get("/session-info");
        setSession(session);
      } catch (error) {
        setSession(null);
        if (redirectIfUnauthorized) {
          router.push("/authentication/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router, redirectIfUnauthorized]);

  return { session, loading };
}
