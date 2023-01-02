import { getText, isGroup, sendMessage } from "src/utils/utils";
import { Context } from "telegraf";
import { PoleService } from "./pole.service";
const poleService = new PoleService();


const pole = (ctx: Context) => {
    if (!isGroup(ctx)) {
        soloGrupos(ctx);
    } else {
        sendMessage(ctx, poleService.pole(ctx))
    }
}
const polele = (ctx: any) => {
    sendMessage(ctx, "Felicidades, has ganado la polele, es inútil, pero es la polele!!!");
}
const poleRank = (ctx: any) => {
    if (isGroup(ctx)) {
        soloGrupos(ctx);
    } else {
        sendMessage(ctx, poleService.pole(ctx))
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
        
        }
    }
}

// def is_pole(date):
//     lista = [[time(0,0),time(1,33)],[time(1,33),time(7,33)],[time(7,33),time(13,33)],[time(13,33),time(19,33)],[time(19,33),time(23,59,59,999999)]]
//     pole = -1
//     for i in range(0, lista.__len__()):
//         if date >= lista[i][0] and date < lista[i][1]:
//             if i == 0 or i == 4:
//                 pole = 3
//             elif i == 1:
//                 pole = 0
//             elif i == 2:
//                 pole = 1
//             elif i == 3:
//                 pole = 2
//             break
//     return pole

// '''
// Pole de Invierno 
// def is_pole(date):
//     lista = [[time(0,0),time(2,33)],[time(2,33),time(8,33)],[time(8,33),time(14,33)],[time(14,33),time(20,33)],[time(20,33),time(23,59,59,999999)]]