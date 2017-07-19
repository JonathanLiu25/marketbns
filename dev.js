/**
 * Concurrently run our various dev tasks.
 * Credit: bones (git@github.com:FullstackAcademy/bones.git)
 * Usage: node dev
 **/

const path = require("path");
const dateformat = require("dateformat");
const pkg = require("./package.json");
const { red, green, blue, cyan, yellow } = require("chalk").bold;
const dev = module.exports = () => run({
  build: task(pkg.scripts["build-watch"], { color: green }),
  server: task(pkg.scripts["start-watch"], { color: blue }),
  // lint: task(pkg.scripts["lint-watch"], { color: cyan }),
  // test: task(pkg.scripts["test-watch"], { color: yellow })
});


function run(tasks) {
  Object.keys(tasks)
    .map(name => tasks[name](name));
}

function task(command, {
  spawn = require("child_process").spawn,
  color
} = {}) {
  return name => {
    const stdout = log({ name, color }, process.stdout),
      stderr = log({ name, color, text: red }, process.stderr),
      proc = spawn(command, {
        shell: true,
        stdio: "pipe",
        env: taskEnvironment(),
      }).on("error", stderr)
        .on("exit", (code, signal) => {
          stderr(`Exited with code ${code}`);
          if (signal) stderr(`Exited with signal ${signal}`);
        });
    proc.stdout.on("data", stdout);
    proc.stderr.on("data", stderr);
  };
}

function log({
  name,
  ts = timestamp,
  color = none,
  text = none,
}, out = process.stdout) {
  return data => data.toString()
    // Strip out screen-clearing control sequences, which really
    // muck up the output.
    .replace("\u001b[2J", "")
    .replace("\u001b[1;3H", "")
    .split("\n")
    .forEach(line => out.write(`${color(`${ts()} ${name}   \t⎹ `)}${text(line)}\n`));
}

function taskEnvironment() {
  const env = {};
  for (const key in process.env) {
    env[key] = process.env[key];
  }
  Object.assign(env, {
    NODE_ENV: "development",
    PATH: [path.join(__dirname, "node_modules", ".bin")
      , process.env.PATH].join(path.delimiter)
  });
  return env;
}

function timestamp() {
  return dateformat("yyyy-mm-dd HH:MM:ss (Z)");
}

function none(x) { return x; }

if (module === require.main) dev();
