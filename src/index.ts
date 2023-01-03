import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';
import { textMessage } from './pole/pole';
import { isAdmin } from './utils/utils';
import { ConfigService } from './config/config';
dotenv.config();
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
    isAdmin(ctx) && configService.invierno();
});
bot.command('verano', (ctx: Context) => {
    isAdmin(ctx) && configService.verano();
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

