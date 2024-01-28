import {promises as fs} from 'fs';
import {Message} from "./types";

const fileName = './db.json';
let data: Message[] = [];

export const messageDb = {
    async init () {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getMessages (){
        return data;
    },
    async addMessage (item: Message) {
        data.push(item);
        await this.save();
    },
    async save () {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};