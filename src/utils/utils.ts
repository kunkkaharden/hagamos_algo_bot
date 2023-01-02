import { Context } from "telegraf";

export const getText = (ctx: any): string => {
    return ctx.message.text;
}

export const getUser = (ctx: Context): number => {
    return ctx.message.from.id;
}

export const isGroup = (ctx: Context): boolean => {
    return ["group","supergroup"].includes(ctx.chat.type);
}

export const sendMessage = (ctx: Context, text: string) => {
    ctx.telegram.sendMessage(getUser(ctx), text);
}

export const isAdmin = (ctx: Context): boolean => {
    return ctx.from.id === +process.env.BOT_ADMIN;
}