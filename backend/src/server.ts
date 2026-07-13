import express from "express";
import cors from "cors";
import "dotenv/config";

import { visitorRouter } from "./routes/visitor.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.use("/visitors", visitorRouter);
app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
   res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
