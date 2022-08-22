import UFDLServerContext from "../../UFDLServerContext";
import {Convert} from "../../json/generated/CategoriesFile";

export type CategoriesFile = ReturnType<typeof Convert.toCategoriesFile>

// region CategoriesViewSet

export async function get_categories(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<CategoriesFile> {
    const response = await context.get(`${url}/${pk}/categories`);

    return response.json()
}

export async function get_categories_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<CategoriesFile[string]> {
    const response = await context.get(`${url}/${pk}/categories/${filename}`);

    return response.json()
}

export async function set_categories(
    context: UFDLServerContext,
    url: string,
    pk: number,
    categories: CategoriesFile
): Promise<CategoriesFile> {
    const response = await context.post(`${url}/${pk}/categories`, categories);

    return response.json()
}

export async function add_categories(
    context: UFDLServerContext,
    url: string,
    pk: number,
    images: string[],
    categories: string[]
): Promise<CategoriesFile> {
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
): Promise<CategoriesFile> {
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
