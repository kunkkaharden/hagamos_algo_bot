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

      async invierno()  {
         console.log("invierno");
        await this.dBService.update_horario("invierno")
        this.update();
     }
      async verano()  {
         console.log("verano");
         
        await this.dBService.update_horario("verano")
        this.update();
     }

     async update()  {
        this._horario = await this.dBService.obtener_horario();
     }
}