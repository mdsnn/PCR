import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "../store/authSlice";
import { supabase } from "../supabase";

export default function AuthProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      dispatch(setSession(session));
    });

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  return null;
}
