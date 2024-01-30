import express from "express";
import {messageDb} from "../messageDb";
import {Message} from "../types";

const messageRouter = express.Router();

messageRouter.post('/', async (req, res, next) => {
    try {
        const message = req.body.message;
        const author = req.body.author;

        if (!message || !author) {
            return res.status(422).send({error: "Author or message must be present in the request!"});
        }

        const newMessage: Message = {
            id: crypto.randomUUID(),
            message,
            author,
            datetime: (new Date()).toISOString(),
        }

        await messageDb.addMessage(newMessage);
        res.send(newMessage);
    } catch (e) {
        next(e);
    }
});

messageRouter.get('/', async (req, res, next) => {
    try {
        const messages = await messageDb.getMessages();
        const datetime = req.query.datetime as string;
        const date = new Date(datetime);

        if (datetime) {
            if (isNaN(date.getDate())) {
                return res.status(400).send({error: "Incorrect date"});
            }

            const index = messages.findIndex((message) => message.datetime === datetime);
            if (index === -1) {
                res.send([]);
            } else {
                res.send(messages.slice(index + 1));
            }
            res.send('Message date!' + datetime);
        } else {
            res.send(messages.slice(-30));
        }
    } catch (e) {
        next(e);
    }
});

export default messageRouter;