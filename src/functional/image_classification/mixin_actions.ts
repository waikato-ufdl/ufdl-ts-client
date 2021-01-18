import UFDLServerContext from "../../UFDLServerContext";
import {RawJSONObject} from "../../types";

// region CategoriesViewSet

export async function get_categories(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<RawJSONObject> {
    const response = await context.get(`${url}/${pk}/categories`);

    return response.json()
}

export async function add_categories(
    context: UFDLServerContext,
    url: string,
    pk: number,
    images: string[],
    categories: string[]
): Promise<RawJSONObject> {
    const response = await context.patch(
        `${url}/${pk}/categories`,
        {
            method: "add",
            images: images,
            categories: categories
        }
    );

    return response.json()
}

export async function remove_categories(
    context: UFDLServerContext,
    url: string,
    pk: number,
    images: string[],
    categories: string[]
): Promise<RawJSONObject> {
    const response = await context.patch(
        `${url}/${pk}/categories`,
        {
            method: "remove",
            images: images,
            categories: categories
        }
    );

    return response.json()
}
