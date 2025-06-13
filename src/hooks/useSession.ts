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
        const { sessionData } = await apiClient.get<{
          sessionData: false | any;
        }>("/session-info");

        

        setSession(sessionData);
      } catch (error) {
        console.error(error)
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
