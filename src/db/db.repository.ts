import { DataSource, EntityTarget } from "typeorm";
import { Config } from "./entities/config.entity";
import { Persona } from "./entities/persona.entity";
import { Pole } from "./entities/pole.entity";
import { Registro } from "./entities/registro.entity";
import * as dotenv from 'dotenv';
dotenv.config();
export class Repository {
    private static _instance: Repository;
    private datasource: DataSource;
    private constructor(datasource: DataSource) {
        console.log("> Repository"); 
        this.datasource = datasource;    
    }
 
   public static getInstance(datasource: DataSource)
     {
         return this._instance || (this._instance = new this(datasource));
     }

     public static get instance()
     {
         return this._instance;
     }

     getRepository<T>(target: EntityTarget <T>) {
        return this.datasource.getRepository<T>(target);
     }


}
