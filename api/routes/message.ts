import express from "express";
import {Message} from "../types";

const messageRouter = express.Router();

messageRouter.post('/', (req, res, next) => {
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

        res.send(newMessage);
    } catch (e) {
        next(e);
    }
});

export default messageRouter;