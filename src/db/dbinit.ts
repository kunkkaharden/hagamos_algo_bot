import "reflect-metadata"
import { DataSource } from "typeorm";
import { Config, Persona, Pole, Registro } from "./entities"; 
import { Repository } from "./db.repository";
import { DBService } from "./db.service";
import { Telegram } from "telegraf";
import { ConfigService } from "./../config/config";
const dBInit = () => {
    console.log("> DB init");
    const datasource = new DataSource({
         type: "postgres",
         host: process.env.DB_HOST,
         port: +process.env.DB_PORT,
         username: process.env.DB_USERNAME,
         password:  process.env.DB_PASSWORD,
         database:  process.env.DB_NAME,
         synchronize: true,
         logging: true,
         entities: [Config, Persona, Pole, Registro],
         subscribers: [],
         migrations: [],
     });
     
     return datasource.initialize()

             
 }

 export const  conection = async (telegraf: Telegram) => {
        const ds = await dBInit().then((data) => {
            console.log("> DB");
            Repository.getInstance(data);
            DBService.instance;
            ConfigService.getInstance(telegraf);
            return data;
        });
 }

