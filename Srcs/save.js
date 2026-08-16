import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userFile = path.join(__dirname, "../user.json");

export function SaveUser(gmail, password, id) {
    let users = [];
    if (fs.existsSync(userFile)) {
        try {
            users = JSON.parse(fs.readFileSync(userFile, "utf8"));
        } catch {
            users = [];
        }
    }
    const index = users.findIndex(x => x.id === id);
    if (index !== -1) {
        users[index].gmail = gmail;
        users[index].password = password;
    } else {
        users.push({
            id: id,
            gmail: gmail,
            password: password
        });
    }
    fs.writeFileSync(userFile, JSON.stringify(users, null, 4));
}