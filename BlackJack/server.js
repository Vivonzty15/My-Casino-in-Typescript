const spawn = require("cross-spawn");
const liveServer = require("live-server");
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const isWin = process.platform === "win32";
console.log(process.env.PATH)

// (function() {
//     var childProcess = require("child_process");
//     childProcess.spawn = require('cross-spawn');
// })();
async function main() {
  crossSpawn = require("cross-spawn");
  spawn("npx",["json-server", "--watch", "--port", "9901", "db.json"],
    { stdio: "inherit" }
  );
  await sleep(1000); // <-- Wait one second, so that the json-server has started by the time the live-server opens.
  liveServer.start({
    port: 9000,
    logLevel: 0,
    root: "./public",
  });
}
main();