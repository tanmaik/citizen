import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/wikipedia-edit", async (req, res) => {
  const {
    id,
    notifyUrl,
    title,
    titleUrl,
    comment,
    timestamp,
    user,
    bot,
    minor,
    lengthOld,
    lengthNew,
    serverName,
    wiki,
    parsedComment,
  } = req.body;

  const existingEdit = await prisma.wikipediaEdit.findFirst({
    where: {
      OR: [{ notifyUrl }, { id }],
    },
  });

  if (existingEdit) {
    return res.status(200).json(existingEdit);
  }
  try {
    // const newEdit = await prisma.wikipediaEdit.create({
    //   data: {
    //     id,
    //     notifyUrl,
    //     title,
    //     titleUrl,
    //     comment,
    //     timestamp,
    //     user,
    //     bot,
    //     minor,
    //     lengthOld,
    //     lengthNew,
    //     serverName,
    //     wiki,
    //     parsedComment,
    //   },
    // });
    console.log(`wikipedia edit processed: ${notifyUrl}`);
    res.status(201).json(newEdit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error: couldn't add wikipedia edit to db" });
  }
});

export const ingest = router;
