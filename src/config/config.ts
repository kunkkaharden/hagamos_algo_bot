import { DBService } from "../db/db.service";

export class ConfigService {
    private static _instance: ConfigService;
    private _horario: string; 
    private dBService: DBService;
    private constructor() {
        this.dBService = DBService.instance;
        this.update();
    }
 
   public static get instance()
     {
         return this._instance || (this._instance = new this());
     }
     get horario () {
        return this._horario;
     }

      async invierno()  {
        await this.dBService.update_horario("invierno")
        this.update();
     }
      async verano()  {
        await this.dBService.update_horario("verano")
        this.update();
     }

     async update()  {
        this._horario = await this.dBService.obtener_horario();
     }
}