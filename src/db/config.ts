import { DataSource } from "typeorm";
import { Config } from "./entities/config.entity";
import { Persona } from "./entities/persona.entity";
import { Pole } from "./entities/pole.entity";
import { Registro } from "./entities/registro.entity";

export class Repository {
    private static _instance: Repository;
    private datasource: DataSource;
    private constructor() {
        this.datasource = new DataSource({
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
        })
    }
 
   public static get instance()
     {
         return this._instance || (this._instance = new this());
     }

     getRepository<T>(entity: any) {
        return this.datasource.getRepository<T>(entity);
     }
}
