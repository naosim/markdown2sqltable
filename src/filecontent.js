const fs = require('fs')

class FileContent {
  constructor(path, fileName, text) {
    this.path = path
    this.fileName = fileName
    this.fullPath = `${path}/${fileName}`
    this.text = text
    this.save = () => {
      console.log(text)
      console.log(`=> ${this.fullPath}`)
      FileContent.mkdirs(path)
      fs.writeFileSync(this.fullPath, text)
    }
  }
}
FileContent.mkdirs = function(path) {
  var current = ''
  path.split('/').filter(v => v.trim().length > 0).forEach((p, i) => {
    current += `${i == 0  ? '' : '/'}${p}`
    try {
      fs.mkdirSync(current)
    } catch(e) {
      // nop
    }
  })
}

module.exports = FileContent