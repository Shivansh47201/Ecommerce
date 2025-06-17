import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./config/db.js";

dotenv.config();

const PORT= process.env.PORT 

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log("Oops! Server Crashed", error);
  }
};

start();
