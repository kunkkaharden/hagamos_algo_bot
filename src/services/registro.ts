import { deleteMessage, getCategoria, getEnlace, getText, isAdmin, isGroup, responder, sendLog, sendMessage } from "../utils/utils";
import { Context } from "telegraf";
import axios, {BASE_URL} from '../utils/http-adaptador';
import { validarCategorias } from "../utils/validar-categorias";
export const add = async(ctx: Context, temporal: boolean) => {
    try {
        const enlace = getEnlace(ctx);
        const categoria = getCategoria(ctx);
        if (validarCategorias(categoria)) {
            await  axios.post(BASE_URL + `registro/add`, {
                enlace,
                categoria,
                temporal,
            });

            responder(ctx, `ok...`);
        } else {
            responder(ctx, `La categoría  ${categoria} no es válida`);
        } 
    } catch (error) {
        console.log(error);
        responder(ctx, `Ver logs...`);
        sendLog(ctx, error)
    }
    
    // responder(ctx, 'hola');
}


export const deletePost = async(ctx: Context) => {
    try {
        await axios.delete(BASE_URL + `registro?enlace=${''}`);
        deleteMessage(ctx);
    } catch (error) {
        console.log(error);
        responder(ctx, `Ver logs...`);
        sendLog(ctx, error)
    }
}