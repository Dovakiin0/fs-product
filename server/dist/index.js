"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config(); // initialize dotenv
const PORT = parseInt(process.env.PORT || "3030", 10);
const HOST = process.env.HOST || "192.168.1.105";
// Start the server
server_1.default.listen(PORT, HOST, () => {
    console.log(`Server running on port ${HOST}:${PORT}`);
});
