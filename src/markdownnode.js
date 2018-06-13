class MarkdownNode {
  constructor(text, parent) {
    this.child = []
    if(parent) {
      text = text.trim();
      this.title = text;
      this.text = text;
      this.parent = parent;
      this.nest = parent.nest + 1;
      parent.child.push(this);
      var pathName = text.split(':')[0].trim();
      this.path = parent.isRoot() ? pathName : `${parent.path}.${pathName}`;
    } else {
      this.nest = 0;
    }
    
    this.isRoot = () => parent ? false : true;
    this.getParent = (num) => {
      var parent = this.parent;
      for(var i = 0; i < num; i++) {
        parent = parent.parent;
      }
      return parent;
    }

    this.getCurrentPath = () => pathName;

    this.eachChildNode = (cb) => {
      this.child.forEach(c => {
        cb(c);
        c.eachChildNode(cb);
      });
    }

    this.getBody = () => {
      if(this.text.indexOf('\n') != -1) {
        return this.text.slice(this.text.indexOf('\n')).trim();
      } else {
        return '';
      }
    }
  }
}
MarkdownNode.createRoot = (text) => {
  var root = new MarkdownNode();
  
  var current = root;
  text
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0)
    .forEach(line => {
      if(line[0] == '#') {
        var space = line.indexOf(' ');
        var nest = line.slice(0, space).length;
        var text = line.slice(space).trim();
        var n;
        if(nest == current.nest) {
          n = new MarkdownNode(text, current.parent);
        } else if(nest == current.nest + 1) {
          n = new MarkdownNode(text, current);
        } else if(nest > current.nest) {
          throw '深すぎる'
        } else if(nest < current.nest) {
          n = new MarkdownNode(text, current.getParent(current.nest - nest));
        }
        current = n;
      } else {// ヘッダー行以外
        current.text += '\n' + line;
      }
    });

  return root
}
function createRootMarkdownNode(text) {
  var root = new MarkdownNode();
  
  var current = root;
  text
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0)
    .forEach(line => {
      if(line[0] == '#') {
        var space = line.indexOf(' ');
        var nest = line.slice(0, space).length;
        var text = line.slice(space).trim();
        var n;
        if(nest == current.nest) {
          n = new MarkdownNode(text, current.parent);
        } else if(nest == current.nest + 1) {
          n = new MarkdownNode(text, current);
        } else if(nest > current.nest) {
          throw '深すぎる'
        } else if(nest < current.nest) {
          n = new MarkdownNode(text, current.getParent(current.nest - nest));
        }
        current = n;
      } else {// ヘッダー行以外
        current.text += '\n' + line;
      }
    });

  return root
}

module.exports = MarkdownNode