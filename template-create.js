const ejs = require("ejs");
const fs = require("fs");
const chalk = require('chalk');

const log = (content, color = 'green') => console.log(chalk[color](content));
if (!process.argv[2]) {
  log("please input namespace in argv", "red");
  process.exit(0);
}

let namespace = process.argv[2];
const configData = {
  namespace,
}
let modelsStr = fs.readFileSync('./template/models/index.ejs', "utf8");
modelsStr = ejs.render(modelsStr, configData);
let pageStr = fs.readFileSync('./template/index.ejs', "utf8");
pageStr = ejs.render(pageStr, configData);
let configStr = fs.readFileSync('./template/index.config.ejs', "utf8");
configStr = ejs.render(configStr, configData);
let scssStr = fs.readFileSync('./template/index.scss.ejs', "utf8");
scssStr = ejs.render(scssStr, configData);
let servicesStr = fs.readFileSync('./template/services.ejs', "utf8");

/** 
 * 文件是否已存在
 *  */
const filsInRoute = fs.readdirSync("./src/pages");
if (filsInRoute.includes(namespace)) {
  log("创建页面namespace：该页面文件已存在!", 'red');
  process.exit(0);
}

process.chdir("./src/pages");
fs.mkdirSync(namespace);
process.chdir(namespace);
fs.writeFileSync('index.js', pageStr);
fs.writeFileSync('index.config.js', configStr);
fs.writeFileSync('index.scss', scssStr);
fs.writeFileSync('services.js', servicesStr);
fs.mkdirSync("models");
process.chdir("models");
fs.writeFileSync(namespace + ".js", modelsStr);

log(`create ${namespace} success`);



