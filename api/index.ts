import express from 'express';
import messageRouter from "./routes/message";
import {messageDb} from "./messageDb";
import cors from 'cors';
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messageRouter);

const run = async () => {
    await messageDb.init();

    app.listen(port, () => {
        console.log(`Server start on ${port} port!`);
    });
};

run().catch(console.error);


