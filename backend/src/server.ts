import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────
// TODO: Import your visitor router and mount it here
// e.g. app.use("/visitors", visitorRouter);

app.get("/health", (_req, res) => {
  // TODO: Return a JSON response confirming the server is running
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
