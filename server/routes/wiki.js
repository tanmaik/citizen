import express from "express";
import { prisma } from "../db/client.js";

const wiki = express.Router();

const handleError = (error, res) => {
  console.log(`${error.stack || error.message}`);
  res.status(500).json({ error: "Internal server error" });
};

wiki.get("/edits", async (req, res) => {
  try {
    const edits = await prisma.wikiEdit.findMany();
    console.log(`Found ${edits.length} edits`);
    res.json(edits);
  } catch (error) {
    handleError(error, res);
  }
});

wiki.post("/edits", async (req, res) => {
  try {
    const {
      title,
      title_url,
      comment,
      user,
      bot,
      notify_url,
      minor,
      length_old,
      length_new,
      server_url,
    } = req.body;

    const edit = await prisma.wikiEdit.create({
      data: {
        title,
        titleUrl: title_url,
        comment,
        user,
        bot,
        notifyUrl: notify_url,
        minor,
        lengthOld: length_old,
        lengthNew: length_new,
        serverUrl: server_url,
      },
    });
    console.log(`Created edit for article '${title}'`);
    res.json(edit);
  } catch (error) {
    handleError(error, res);
  }
});

export { wiki };
