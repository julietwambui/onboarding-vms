import rateLimit, {ipKeyGenerator} from "express-rate-limit";
import {Request} from "express";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const email = req.body?.email?.toLowerCase().trim() || "unknown";
    return `${email}:${ipKeyGenerator(req.ip ?? "")}`;
},
});