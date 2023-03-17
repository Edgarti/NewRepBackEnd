import dotenv from "dotenv";
import ParsedArgs from "minimist";

dotenv.config();






//varables globales

export const options ={
    server:{

        PORT: objArgs.port,
        MODE: objArgs.mode,
    },
    mongo:{
        url:process.env.mongo_url
    }           

}
