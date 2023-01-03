import { ConfigService } from "src/config/config";
import { textMessage } from "src/pole/pole";
import { isAdmin } from "src/utils/utils";
import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "telegraf/typings/core/types/typegram";

export const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);
const configService = ConfigService.instance;

bot.start((ctx: Context) => {
    const user = ctx.message!.from.first_name;
    ctx.reply(`Bienvenido ${user}`);
});
bot.on(message('text'), (ctx: Context) => {
    textMessage(ctx);
});

bot.command('invierno', (ctx: Context) => {
    isAdmin(ctx) && ConfigService.instance.invierno();
});
bot.command('verano', (ctx: Context) => {
    isAdmin(ctx) && configService.verano();
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 