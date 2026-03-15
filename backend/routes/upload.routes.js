const express = require("express");
const multer = require("multer");
const { uploadBuffer } = require("../utils/uploadImage");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/uploadMultipleImages",
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }

      const urls = await Promise.all(
        req.files.map((file) => uploadBuffer(file.buffer))
      );

      res.status(200).json({ urls });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

router.post("/uploadPaySlip", upload.single("paySlip"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const url = await uploadBuffer(req.file.buffer);
    res.status(200).json({ url });
  } catch (err) {
    console.error("PaySlip upload error:", err);
    res.status(500).json({ error: "PaySlip upload failed" });
  }
});

module.exports = router;
