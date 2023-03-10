"usestrict";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

class Server {
  constructor(PORT) {
    this.PORT = PORT;
    this.app = express();
    this.initExpressMiddleware();
    this.server = this.server_Init();
  }

  initExpressMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  server_Init() {
    // SERVER STATUS
    return this.app.listen(this.PORT, () => {
      console.log(`Server running on: http://localhost:${this.PORT}/`);
    });
  }
}

export { Server };
