const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.get("/", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ status: false, message: "URL video tidak ditemukan." });
  }

  const command = `yt-dlp -g --no-check-certificate --no-warnings "${videoUrl}"`;

  exec(command, (err, stdout, stderr) => {
    if (err || !stdout) {
      return res.status(500).json({ status: false, message: "Gagal mengambil video." });
    }

    const links = stdout.trim().split("\n");
    return res.json({
      status: true,
      platform: detectPlatform(videoUrl),
      judul: "Video berhasil ditemukan",
      unduh: links[0]
    });
  });
});

function detectPlatform(url) {
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return "tidak dikenal";
}

module.exports = router;
