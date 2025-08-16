import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../lib/supabase";
import { getSession, setSession } from "../store/authSlice";

export default function AuthProvider({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get initial session
    dispatch(getSession());

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      dispatch(setSession(session));
    });

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [user, segments, loading, router]);

  return children;
}
