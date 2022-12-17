const { parse } = require("csv-parse");
const fs = require("fs");

const csvData = [];

fs.createReadStream("./data/export_projects.csv")
  .pipe(
    parse({
      columns: true,
      delimiter: "|",
    })
  )
  .on("data", (data) => csvData.push(data))
  .on("error", (error) => console.log(error))
  .on("end", () => {
    console.log(csvData);
    console.log(`done with ${csvData.length} items.`);
  });
