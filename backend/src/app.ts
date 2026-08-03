import express from "express";
import cors from "cors";
import "dotenv/config";

import { visitorRouter } from "./routes/visitor.routes";
import authRoutes from "./routes/auth.routes";
import departmentRoutes from "./routes/department.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/visitors", visitorRouter);
app.use("/auth", authRoutes);
app.use("/departments",departmentRoutes);

app.get("/health", (_req, res) => {
   res.json({ status: "ok" });
});

export default app;
