import express from 'express';
import connectDb from './config/dbConfig';
import cors from 'cors';
import dotenv from 'dotenv';
import e from 'express';
import shortUrl from './routes/shortUrl';

dotenv.config();
connectDb();
const PORT = process.env.PORT || 5001;  

const app = express();//middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.urlencoded({extended: true}));

app.use("/api", shortUrl);
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
