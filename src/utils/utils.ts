import { Context } from "telegraf";

export const getText = (ctx: any): string => {
    return ctx.message.text;
}
export const getIdReply = (ctx: any): number => {
    return ctx.message.reply_to_message.message_id;
}

export const getEnlace = (ctx: any) => {
    return `${ctx.message.chat.username}/${getIdReply(ctx)}`; 
}
export const getCategoria = (ctx: any) => {
    const text: string =  ctx.message.reply_to_message.caption;
    const categoria = text.split('\n')[0];
    return categoria.replace('#', '').toLocaleUpperCase();
    
}

export const deleteBotMessage = (ctx: Context , info: {message_id: number; chat: {id: number;}} ) => {
    setTimeout(() => {
        ctx.telegram.deleteMessage(info.chat.id, info.message_id);
    }, 20000);
}


export const deleteBotCommand = (ctx: Context ) => {
    setTimeout(() => {
        ctx.telegram.deleteMessage(getIdChat(ctx), getIdMessage(ctx));
    }, 20000);
}


export const deleteMessage = async(ctx: Context ) => {
    await ctx.telegram.deleteMessage(getIdChat(ctx), getIdReply(ctx));
}

export const getIdPersona = (ctx: Context): number => {
    return ctx.message.from.id;
}
export const getIdChat = (ctx: Context): number => {
    return ctx.message.chat.id;
}
export const getIdMessage = (ctx: Context): number => {
    return ctx.message.message_id;
}
export const getNombrePersona = (ctx: Context): string => {
    return ctx.message.from.first_name;
}

export const isGroup = (ctx: Context): boolean => {
    return ["group","supergroup"].includes(ctx.chat.type);
}
export const isReply = (ctx: any): boolean => {
    return !!ctx.message.reply_to_message;
}

export const isValidPost = (ctx: any): boolean => {
    return !!ctx.message.reply_to_message.caption && !!ctx.message.reply_to_message.photo;
}
export const isPost = (ctx: Context) => {
    return isReply(ctx) && isValidPost(ctx);
}
export const sendMessage = async(ctx: Context, text: string) => {
    const options: {message_thread_id?: number, reply_to_message_id?: number} = {};
    ctx.message.is_topic_message && (options.message_thread_id = ctx.message.message_thread_id);
    const info = await ctx.telegram.sendMessage(getIdChat(ctx), text, options);
    deleteBotMessage(ctx, info);
}

export const responder = async(ctx: Context, text: string) => {
    const options: {message_thread_id?: number, reply_to_message_id?: number} = {};
    ctx.message.is_topic_message && (options.message_thread_id = ctx.message.message_thread_id);
    options.reply_to_message_id = getIdReply(ctx);
    const info = await ctx.telegram.sendMessage(getIdChat(ctx), text, options);
    deleteBotMessage(ctx, info);
}


export const isAdmin = (ctx: Context): boolean => {
    const admins: number[] = JSON.parse(process.env.BOT_ADMIN);
    return admins.includes(ctx.from.id);
}

export const getHora = (ctx: Context): string => {
    const date =  new Date(ctx.message.date * 1000);
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return h +":"+ m +":"+ s;
}

export const sendLog = (ctx: Context, info: any) => {
    ctx.telegram.sendMessage(process.env.ADMIN, JSON.stringify(info));
} 

export const getArgumento = (ctx: Context): string => {
    const text = getText(ctx);
    const splited  = text.split(' ');
    splited.shift();
    return splited.join(' ');
}