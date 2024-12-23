const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("file words/lines counter cli")
  .description("CLI to do the file based tasks")
  .version("0.8.0");

program
  .command("countwords")
  .description("count the number of words in the files")
  .argument("<file>", "Argument to count the number of words in the file")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(" ").length;
        console.log(`There are ${words} words in ${file}`);
      }
    });
  });
program.parse();
