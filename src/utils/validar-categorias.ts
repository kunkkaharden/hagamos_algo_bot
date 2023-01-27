import { Categorias } from "./Categorias"

export const validarCategorias = (cat: string) => {
    const categorias = Object.values<string>(Categorias);
    return categorias.includes(cat);
}