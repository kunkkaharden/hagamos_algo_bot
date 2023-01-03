import { sendMessage } from "./../utils/utils";
import { Context, Telegraf } from "telegraf";
import { DBService } from "../db/db.service";
import { Telegram } from "telegraf";

export class ConfigService {
    private static _instance: ConfigService;
    private _horario: string; 
    private dBService: DBService;
    private _telegram: Telegram
    private constructor(telegram: Telegram) {
        console.log("> ConfigService");
        this.dBService = DBService.instance;
        this._telegram = telegram;
    }
 
   public static get instance()
     {
         return this._instance;
     }

     public  get telegram()
     {
         return this._telegram;
     }

     public static getInstance(telegram: Telegram)
     {
         return this._instance || (this._instance = new this(telegram));
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