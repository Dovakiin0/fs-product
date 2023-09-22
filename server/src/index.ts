import dotenv from "dotenv";
import server from "./server";

dotenv.config(); // initialize dotenv

const PORT = parseInt(process.env.PORT || "3030", 10);
const HOST = process.env.HOST || "192.168.1.105";

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Server running on port ${HOST}:${PORT}`);
});
