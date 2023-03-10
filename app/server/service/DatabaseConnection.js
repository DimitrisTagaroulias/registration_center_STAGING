import mongoose from "mongoose";

class DatabaseConnection {
  constructor(dbUrl) {
    this.db;
    this.initDatabase(dbUrl);
  }
  #dbUrl;
  setdbURL(URL) {
    this.#dbUrl = URL;
  }

  async initDatabase(URL) {
    this.setdbURL(URL);
    await this.initDatabaseConnection();
    this.getStatusDB();
  }

  async initDatabaseConnection() {
    try {
      // Connect to DataBase
      mongoose.set("strictQuery", false);
      mongoose.connect(this.#dbUrl);
      this.db = mongoose.connection;
    } catch (error) {
      console.log(error);
    }
  }

  getStatusDB() {
    try {
      // DataBase STATUS
      this.db.on("connected", () => {
        console.log(`Mongoose is connected at: ${this.#dbUrl}`);
        console.log(
          `Mongoose connection status: ${mongoose.connection.readyState}`
        );
      });
      this.db.on("error", (error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
}

export { DatabaseConnection };
