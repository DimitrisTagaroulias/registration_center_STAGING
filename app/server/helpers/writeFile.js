import fs from "fs";
import { dirname as getDirName } from "path";
///////////////////////////////////////////////////////

function writeFile(path, contents, cb) {
  fs.mkdir(getDirName(path), { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

export { writeFile };
