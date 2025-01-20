import express from "express";
import cors from "cors";
import { ingest } from "./routes/ingest.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.send("pulse");
});

app.use("/ingest", ingest);

app.use((req, res) => {
  console.log(`not found: ${req.method} ${req.path}`);
  res.status(404).send("route not found");
});

app.use((err, req, res, next) => {
  console.log(`${err.stack || err.message}`);
  console.log(`error: ${err}`);
  res.status(500).json({ error: "internal server error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

export default app;
