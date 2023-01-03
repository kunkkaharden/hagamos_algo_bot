import { getHora, getIdPersona, getNombrePersona, sendMessage } from "./../utils/utils";
import { Context } from "telegraf"
import { ConfigService } from "./../config/config";
import { DBService } from "src/db/db.service";
/**
 * Static:
 * PoleService.instance
 */
export class PoleService {
   private static _instance: PoleService;
   private readonly configService: ConfigService;
   private readonly dBService: DBService;
   private constructor() {
      this.configService = ConfigService.instance;
      this.dBService = DBService.instance;
   }

  public static get instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }


//  const list = [[time(0,0),time(1,33)],[time(1,33),time(7,33)],[time(7,33),time(13,33)],[time(13,33),time(19,33)],[time(19,33),time(23,59,59,999999)]]
 async pole(ctx: Context) {
    const hora=  getHora(ctx);
    const pole = this.isPole(ctx);
    const num_pole = await this.dBService.obtener_num_pole();
    if (num_pole !== pole) {
      await this.dBService.clean_registro();
      await this.dBService.update_num_pole(pole);
    }
    const isPole = await this.dBService.pole(ctx.message.chat.id);
    if(isPole) {
      this.dBService.analizar_persona(getIdPersona(ctx), getNombrePersona(ctx));
      sendMessage(ctx, `${getNombrePersona(ctx)} ha ganado la pole XD ` )
    } else {
      sendMessage(ctx, "Te mamaste")
    }

    
    
    return ""
 }

 poleRank(): string {
    return ""
 }

   isPole(ctx: Context) {
   let pole = -1;
   const hora=  getHora(ctx);
   const horario = this.configService.horario;
   let lista: string[][];
   if(horario === "vereano") {
      lista = [["03:33:00", "09:33:00"], ["09:33:00", "15:33:00"],  ["15:33:00", "21:33:00"], ["21:33:00", "03:33:00"]];
   } else {
      lista = [["04:33:00", "10:33:00"], ["10:33:00", "16:33:00"],  ["16:33:00", "22:33:00"], ["22:33:00", "04:33:00"]]
   }
 
   let i = 0;
   while (i < lista.length && pole === -1) {
      if (hora >= lista[i][0] && hora < lista[i][1]) {
         pole = i
      }
      i++;
   }
   return `${pole}`
 }
}