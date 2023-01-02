import { Context } from "telegraf"

export class PoleService {
 pole(ctx: Context): string {
    return new Date(ctx.message.date).toDateString();
 }

 poleRank(): string {
    return ""
 }
}