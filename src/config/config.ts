import { sendMessage } from "src/utils/utils";
import { Context } from "telegraf";
import { DBService } from "../db/db.service";

export class ConfigService {
    private static _instance: ConfigService;
    private _horario: string; 
    private dBService: DBService;
    private constructor() {
        console.log("> ConfigService");
        this.dBService = DBService.instance;
    }
 
   public static get instance()
     {
         return this._instance || (this._instance = new this());
     }
     get horario () {
        return this._horario || "verano";
     }

      async invierno(ctx: Context)  {
        await this.dBService.update_horario("invierno")
        this.update(ctx);
     }
      async verano(ctx: Context)  {
        await this.dBService.update_horario("verano")
        this.update(ctx);
     }

     async update(ctx: Context)  {
        this._horario = await this.dBService.obtener_horario();
        sendMessage(ctx, `Horario: ${this._horario}`)
     }
}