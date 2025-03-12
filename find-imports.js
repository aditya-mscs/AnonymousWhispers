const fs = require("fs")
const path = require("path")

function searchFiles(dir, searchString) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      searchFiles(filePath, searchString)
    } else if (stat.isFile() && (filePath.endsWith(".ts") || filePath.endsWith(".tsx"))) {
      const content = fs.readFileSync(filePath, "utf8")
      if (content.includes(searchString)) {
        console.log(`Found in ${filePath}`)
      }
    }
  }
}

searchFiles(".", "forwardRef")

