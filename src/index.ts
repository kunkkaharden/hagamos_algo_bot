import * as dotenv from "dotenv";
import { ConfigService } from "./config/config";
import { textMessage } from "./pole/pole";
import { isAdmin } from "./utils/utils";
import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "telegraf/typings/core/types/typegram";
import { conection } from "./db/dbinit";
dotenv.config();

export const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN as string
);
conection()
  .then(() => {
    console.log("db ok");
    bot.start((ctx: Context) => {
      const user = ctx.message!.from.first_name;
      ctx.reply(`Bienvenido ${user}`);
    });
    bot.on(message("text"), (ctx: Context) => {
      textMessage(ctx);
    });

    bot.command("invierno", (ctx: Context) => {
      isAdmin(ctx) && ConfigService.instance.invierno();
    });
    bot.command("verano", (ctx: Context) => {
      isAdmin(ctx) && ConfigService.instance.verano();
    });
    bot.launch();
  })
  .catch((e) => {
    console.log(e);
  });
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
