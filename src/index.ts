import * as dotenv from 'dotenv';
import { deleteBotCommand, getNombrePersona, isAdmin, isReply, responder } from './utils/utils';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { add, deletePost } from './services/registro';
dotenv.config();

export const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN
);

bot.start((ctx: Context) => {
  ctx.reply(`Bienvenido ${getNombrePersona(ctx)}`);
});

bot.command('add', (ctx: Context) => {
  isReply(ctx) && isAdmin(ctx) && add(ctx, false);
  deleteBotCommand(ctx);
});

bot.command("addtemp", (ctx: Context) => {
  isReply(ctx) && isAdmin(ctx) && add(ctx, true);
  deleteBotCommand(ctx);
});

bot.command("delete", (ctx: Context) => {
  isReply(ctx) && isAdmin(ctx) && deletePost(ctx);
  deleteBotCommand(ctx);
});

bot.launch().then(() => {
  console.log('bot ok');
});
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
