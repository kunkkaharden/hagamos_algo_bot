import "reflect-metadata"
import { DataSource } from "typeorm";
import { Config, Persona, Pole, Registro } from "./entities"; 
import { Repository } from "./config";
import { DBService } from "./db.service";
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

 export const  conection = async () => {
        const ds = await dBInit().then((data) => {
            Repository.getInstance(data);
            DBService.instance;
            return data;
        });
 }
