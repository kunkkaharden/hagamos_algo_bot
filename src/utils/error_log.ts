import { ConfigService } from "./../config/config";
export const send_log = (e: any, metodo: string) => {
    const fecha = new Date();
    let respuesta = fecha.toLocaleString() + "\n" + metodo + "\n";
    respuesta += JSON.stringify(e);
    console.log("send_log", process.env.BOT_ADMIN);
    ConfigService.instance.telegram.sendMessage(process.env.BOT_ADMIN, respuesta);
}