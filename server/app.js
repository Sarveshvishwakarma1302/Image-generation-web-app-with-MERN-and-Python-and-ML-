import express from 'express'
import{config} from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connection} from './database/dbConnection.js'
 import userRoute from "./routes/userRoute.js"
 import imageRoute from "./routes/imageRoutes.js"
export const app= express();
config({path:"./config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","UPDATE","DELETE"],
    credentials:true,
})
);
app.use(express.json());
app.use('/user',userRoute)
app.use('/image',imageRoute)
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

connection();
