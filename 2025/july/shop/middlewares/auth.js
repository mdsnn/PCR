// middlewares/auth.js
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const requireAuth = ClerkExpressRequireAuth();
