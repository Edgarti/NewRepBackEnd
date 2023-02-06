import  *  as dotenv from "dotenv";

dotenv.config();

export const envConfig={
MODO: process.env.MODO || "dev",
PORT: process.env.PORT || 8080,
IDIOMA: process.env.IDIOMA || "english"

}