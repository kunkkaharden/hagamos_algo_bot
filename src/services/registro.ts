import { deleteMessage, getArgumento, getCategoria, getEnlace, getText, isAdmin, isGroup, isPost, responder, sendLog, sendMessage } from "../utils/utils";
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
}


export const deletePost = async(ctx: Context) => {
    const ispost = isPost(ctx);
    try {
    let enlace = ispost === true?
        getEnlace(ctx):
        getArgumento(ctx);
        
        await axios.post(BASE_URL + `registro/delete`, {
            enlace: enlace,
        });
        sendMessage(ctx, 'Eliminado de la base de datos');

        await deleteMessage(ctx); 
    } catch (error) {
        if(error.response.error_code === 400) {
            responder(ctx, 'Elimine el mensaje manualmente: ' + error.on.payload.message_id, );
        } else {
            responder(ctx, `Ver logs...`);
        } 
        console.log(error);
        sendLog(ctx, error)
    }
}

