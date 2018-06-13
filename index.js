// node . inputfile outRootDir
if(process.argv.length == 2) {
  const msg = 'USAGE\nnode . inputMarkdownFile outRootDir'
  console.log(msg)
  throw msg
}

const inputMarkdownFile = process.argv[2]
const outRootDir = process.argv[3]

const fs = require('fs')
const main = require(__dirname + '/src/main.js')


var mdText = fs.readFileSync(inputMarkdownFile, 'utf8')
main.convert(mdText, outRootDir)