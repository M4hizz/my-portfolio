import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, "../src/assets/skills-images");
const outputDir = join(__dirname, "../src/assets/skills-images-optimized");

async function optimizeImages() {
  try {
    const files = await readdir(inputDir);

    console.log("🖼️  Optimizing images...\n");

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

      const inputPath = join(inputDir, file);
      const outputFile = basename(file, ext) + ".jpg";
      const outputPath = join(outputDir, outputFile);

      console.log(`Processing: ${file}`);

      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: "cover",
          position: "center",
        })
        .jpeg({
          quality: 82,
          progressive: true,
          mozjpeg: true,
        })
        .toFile(outputPath);

      const stats = await sharp(outputPath).metadata();
      console.log(
        `  ✓ Saved: ${outputFile} (${stats.width}x${stats.height})\n`
      );
    }

    console.log("✅ All images optimized!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

optimizeImages();
