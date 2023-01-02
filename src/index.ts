import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';
import { textMessage } from './pole';
import { isAdmin } from './utils/utils';
import { invierno, verano } from './config/config';
// import { DBConnection } from './db/config';

dotenv.config();
// DBConnection();

export const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx: Context) => {
    const user = ctx.message!.from.first_name;
    ctx.reply(`Bienvenido ${user}`);
});
bot.on(message('text'), (ctx: Context) => {
    textMessage(ctx);
});

bot.command('invierno', (ctx: Context) => {
    isAdmin(ctx) && invierno();
});
bot.command('verano', (ctx: Context) => {
    isAdmin(ctx) && verano();
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

