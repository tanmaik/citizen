import express from "express";
import cors from "cors";
import { edits } from "./routes/edits.js";
import { prisma } from "./db/client.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  console.log("[Health Check] Server is running");
  res.send("keep a pulse");
});

app.use("/edits", edits);

app.use((req, res) => {
  console.log(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).send("huh");
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(`[Error] ${err.stack || err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
);

const port = parseInt(process.env.PORT || "8080");

app.listen(port, "0.0.0.0", async () => {
  console.log(`[Server] Running on port ${port}`);
  try {
    const test = await prisma.mediaWikiRecentChange.findFirst();
    if (test) {
      console.log("[Server] Database connection successful");
    } else {
      throw new Error("Database connection failed");
    }
  } catch (error) {
    console.log("[Server] Database connection failed");
    process.exit(1);
  }
});
