import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

type CategoriesResponse = Array<Category>;

export async function getAll() {
    const { data } = await httpClient.get<CategoriesResponse>("/category");

    return data;
}
