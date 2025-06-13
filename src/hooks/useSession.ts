import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/ApiClient";
import { ISession } from "@/models/Session";
import { ITier } from "@/models/Tier";

export default function useSession(redirectIfUnauthorized = true) {
  const [session, setSession] = useState<ISession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { sessionData } = await apiClient.get<{
          sessionData: false | { session: ISession; tier: ITier };
        }>("/session-info");

        if (sessionData) {
          setSession(sessionData.session);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error(error);
        setSession(null);
        if (redirectIfUnauthorized) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router, redirectIfUnauthorized]);

  return { session, loading };
}
