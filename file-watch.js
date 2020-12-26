/*
* 监听文件变化自动生成dva配置文件 “./src/models/index”
*/
var chokidar = require('chokidar');
var fs = require("fs");

var watcher = chokidar.watch('./src/pages', {
  ignored: /[\/\\]\./, persistent: true
});

watcher.on("ready", function () {
  console.log("file is on watching")
});


watcher.on("add", function (path) {
  createModelEntry(path);
});

watcher.on("unlinkDir", function (path) {
  createModelEntry(path);
});


function createModelEntry(path) {
  let importStr = `import common from './common';\r\n`
  let exportStr = ['common'];
  let exportInfo = {};
  if (path.includes("/models")) {
    function deepRead(p = './src/pages') {
      if (fs.statSync(p).isFile()) return;
      let childPaths = fs.readdirSync(p);
      childPaths.forEach(c => {
        if (c === "models") {  // 文件夹 == models
          const file = fs.readdirSync(p + "/" + c);
          const spaceName = file.length ? file[0].replace(".js", "") : '';
          if (spaceName) {
            exportInfo[(p + "/" + c).replace(/^[\w\S]*src\//, '../')] = spaceName;
            exportStr.push(spaceName)
          }
        }
        deepRead(p + "/" + c);
      })
    }
    deepRead();

    Object.keys(exportInfo).forEach(key => {
      importStr += `import ${exportInfo[key]} from "${key + "/" + exportInfo[key]}"; \r\n `
    })

    exportStr = 'export default' + `[\r\n${exportStr.join(", \r\n")}\r\n]`;

    fs.writeFileSync("./src/models/index.js", importStr + exportStr)

  }
}