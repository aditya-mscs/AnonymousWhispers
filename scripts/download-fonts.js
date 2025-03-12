const fs = require("fs")
const path = require("path")
const https = require("https")

const FONTS_DIR = path.join(process.cwd(), "public/fonts")

// Create fonts directory if it doesn't exist
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true })
}

// Download Inter variable font
const interFontUrl = "https://rsms.me/inter/font-files/Inter.var.woff2"
const interFontPath = path.join(FONTS_DIR, "inter-var.woff2")

console.log(`Downloading Inter variable font to ${interFontPath}...`)

const file = fs.createWriteStream(interFontPath)
https
  .get(interFontUrl, (response) => {
    response.pipe(file)
    file.on("finish", () => {
      file.close()
      console.log("Inter variable font downloaded successfully!")
    })
  })
  .on("error", (err) => {
    fs.unlink(interFontPath)
    console.error(`Error downloading Inter font: ${err.message}`)
  })

