import { getHora, getIdPersona, getNombrePersona, sendMessage } from "./../utils/utils";
import { Context } from "telegraf"
import { ConfigService } from "./../config/config";
import { DBService } from "./../db/db.service";
/**
 * Static:
 * PoleService.instance
 */
export class PoleService {
   private static _instance: PoleService;
   private readonly configService: ConfigService;
   private readonly dBService: DBService;
   private constructor() {
      console.log("> PoleService");
      this.configService = ConfigService.instance;
      this.dBService = DBService.instance;
   }

  public static get instance()
    {
        return this._instance || (this._instance = new this());
    }


 async pole(ctx: Context) {
    const pole = this.isPole(ctx);
    if ( pole === '-1' ) {
      sendMessage(ctx, "No es horario de poles...")
    } else {
   
      const num_pole = await this.dBService.obtener_num_pole();
      if (num_pole !== pole) {
         await this.dBService.clean_registro();
         await this.dBService.update_num_pole(pole);
      }
      const isPole = await this.dBService.pole(ctx.message.chat.id);
      if(isPole) {
         await this.dBService.analizar_persona(getIdPersona(ctx), getNombrePersona(ctx));
         await this.dBService.add_pole(ctx.message.chat.id, getIdPersona(ctx));
         sendMessage(ctx, `${getNombrePersona(ctx)} ha ganado la pole XD ` )
      } else {
         sendMessage(ctx, "Te mamaste")
      }
   }

 }

 async poleRank(ctx: Context) {
   let lista = await this.dBService.puntuacion(ctx.chat.id);
   lista = lista.sort((a, b) => a.valor - b.valor);
   console.log(lista);
   let respuesta ="Puntos 💜"+ "\n";
    lista.forEach((e) => {
      respuesta += `${e.persona.nombre_persona} --> ${e.valor}`; 
    });
    sendMessage(ctx, respuesta);
 }

   isPole(ctx: Context) {
   let pole = -1;
   const hora=  getHora(ctx);
   const horario = this.configService.horario;
   let lista: string[][];
   if(horario === "verano") {
      lista = [["00:00:00", "03:33:00"], ["03:33:00", "09:33:00"],  ["09:33:00", "15:33:00"], ["15:33:00", "21:33:00"], ["21:33:00", "24:59:59"]];
   } else {
      lista = [["00:00:00", "04:33:00"], ["04:33:00", "10:33:00"],  ["10:33:00", "16:33:00"], ["16:33:00", "22:33:00"], ["22:33:00", "24:59:59"]]
   }
 
   let i = 0;
   while (i < lista.length && pole === -1) {
      if (hora >= lista[i][0] && hora < lista[i][1]) {
         pole = i
      }
      i++;
   }
   pole === 4 ? 0 : pole;
   return `${pole}`
 }
}