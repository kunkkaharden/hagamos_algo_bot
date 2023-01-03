import { getText, isAdmin, isGroup, sendMessage } from "./../utils/utils";
import { Context } from "telegraf";
import { PoleService } from "./pole.service";
import { ConfigService } from "./../config/config";

const pole = (ctx: Context) => {
    if (!isGroup(ctx)) {
        soloGrupos(ctx);
    } else {
        PoleService.instance.pole(ctx);
    
    }

}
const polele = (ctx: any) => {
    sendMessage(ctx, "Felicidades, has ganado la polele, es inútil, pero es la polele!!!");
}
const poleRank = (ctx: any) => {
    if (!isGroup(ctx)) {
        soloGrupos(ctx);
    } else {
        PoleService.instance.poleRank(ctx);
    }
}

const soloGrupos = (ctx: Context) => {
    sendMessage(ctx, "La pole solo está habilitada en grupos o supergrupos");
}

export const textMessage = (ctx: Context) => {
    const text = getText(ctx).toLocaleLowerCase();
    if (!ctx.message.from.is_bot) {
        switch (text) {
            case "pole":
                pole(ctx)
                break;
            case "polele":
                polele(ctx)
                break;
            case "!polerank":
                poleRank(ctx)
                break;
            case "/invierno": 
                isAdmin(ctx) && ConfigService.instance.invierno(ctx);
                break;
        
            case "/verano": 
                isAdmin(ctx) && ConfigService.instance.verano(ctx);
                break;
        }
    }
}
