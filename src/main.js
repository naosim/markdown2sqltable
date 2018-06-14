const MarkdownNode = require(__dirname + '/markdownnode.js')
const FileContent = require(__dirname + '/filecontent.js')


/**
 * CreateIndex文のFileContent生成
 * @param {string} outRootDir 
 * @param {MarkdownNode} node 
 * @param {string} tableName 
 * @param {array} rows
 */
function createIndexFileContents(outRootDir, node, tableName, rows) {
  var indexes = rows.reduce((memo, v) => {
    if(!v.indexes || v.indexes.length == 0) {
      return memo;
    }
    v.indexes.forEach(i => {
      if(!memo[i]) {
        memo[i] = [];
      }
      memo[i].push(v.columnName);
    });
    return memo;
  }, {});
  return Object.keys(indexes).map(k => {
    const path = `${outRootDir}/createindex/${node.path.split('.').join('/')}`
    const f = `${k}.sql`
    const t = `ALTER TABLE ${tableName} ADD INDEX ${k}(${indexes[k].join(', ')});`
    console.log(f);
    return new FileContent(
      path, 
      f, 
      t
    )
  })
}

/**
 * CreateTable文のFileContent生成
 * @param {string} outRootDir 
 * @param {MarkdownNode} node 
 * @param {string} tableName 
 * @param {array} rows 
 */
function createCreateTableFileContent(outRootDir, node, tableName, rows) {
  var maxColumnLength = rows.map(v => v.columnName.length).reduce((memo, v)=> Math.max(memo, v), 0);
  // console.log(maxColumnLength);
  var formatSpace = (str) => '                            '.slice(0, maxColumnLength - str.length)
  var columns = rows.map(v => `${v.columnName}${formatSpace(v.columnName)} ${v.type}${v.isPk ? ' PRIMARY KEY' : ''}${v.isNotNull ? ' NOT NULL' : ''}${v.other ? ' ' + v.other:''}`);
  
  const path = `${outRootDir}/createtable/${node.path.split('.').slice(0, -1).join('/')}`
  const f = `${tableName}.sql`
  var script = `CREATE TABLE ${tableName}(\n${columns.join(',\n')}\n);`
  return new FileContent(path, f, script)
}

class Cell {
  constructor(text) {
    this.value = text || text.trim()
    this.isEmpty = !this.value || this.value.length == 0
    this.getOrDefault = (func, defaultValue) => !this.isEmpty ? func(this.value) : defaultValue
  }
}

function convert(input, outRootDir) {
  var root = MarkdownNode.createRoot(input)
  
  root.eachChildNode(node => {
    // console.log(node.path);
    var body = node.getBody();
    if(body.indexOf('-|-') == -1) {//テーブルがない
      return;
    }

    var tableName = node.getCurrentPath();
    // テーブルの行を取得する
    var rows = body
      .split('\n')
      .filter(v => v.indexOf('|') != -1 && v.indexOf('-|-') == -1)
      .slice(1)
      .map(v => v.split('|').map(v => new Cell(v.trim())))
      .map(v => {
        const columnName = v[2].value
        return {
          columnName:columnName, 
          type:v[6].value, 
          isNotNull: !v[7].isEmpty, 
          other: '',// なし 
          indexes: v[5].getOrDefault(v => [`idx_${tableName}_${columnName}`], []),
          isPk: !v[3].isEmpty
        }
      })
      ;
    
    // create index
    var fileContentList = createIndexFileContents(outRootDir, node, tableName, rows);

    // create table
    fileContentList.push(createCreateTableFileContent(outRootDir, node, tableName, rows))

    // 保存
    fileContentList.forEach(v => v.save())
  })
}

module.exports = {
  convert: convert
}