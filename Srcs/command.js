import axios from "axios";
import Textdata from "../Config/text.json" with { type: "json" };
import Imagedata from "../Config/image.json" with { type: "json" };

export async function Enable(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "1").text;
    const image = Imagedata.find(x => x.id === "1").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}
export async function Disable(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "2").text;
    const image = Imagedata.find(x => x.id === "2").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}

export async function Help_WO(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "3").text;
    const image = Imagedata.find(x => x.id === "3").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}
export async function Help(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "4").text;
    const image = Imagedata.find(x => x.id === "3").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}
export async function Login_Help(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "5").text;
    const image = Imagedata.find(x => x.id === "3").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}

export async function Login_Nor(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "6").text;
    const image = Imagedata.find(x => x.id === "4").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}
export async function Login_Cookie(chat_id, token, enable) {
    const MODE = "sendPhoto";
    const entrypoint = `https://bot-api.zaloplatforms.com/bot${token}/${MODE}`;
    const text = Textdata.find(x => x.id === "7").text;
    const image = Imagedata.find(x => x.id === "4").path;
    await axios.post(entrypoint, {chat_id: chat_id,caption: text,photo: image});
}















