import fs from "fs";
///////////////////////////////////////////////////////

function jsonReader(filePath, callback) {
  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) {
      return callback && callback(err);
    } else {
      try {
        const object = JSON.parse(fileData);
        return callback && callback(null, object);
      } catch (err) {
        return callback && callback(err);
      }
    }
  });
}

export { jsonReader };
