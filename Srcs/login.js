import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userFile = path.join(__dirname, "../user.json");

export function Login(id) {
    if (!fs.existsSync(userFile)) return;

    const users = JSON.parse(fs.readFileSync(userFile, "utf8"));
    const user = users.find(x => x.id === String(id));

    if (!user) return;

    console.log(user.gmail);
    console.log(user.password);
}