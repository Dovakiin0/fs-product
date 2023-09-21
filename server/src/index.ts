import dotenv from "dotenv";
import server from "./server";

dotenv.config(); // initialize dotenv

const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
