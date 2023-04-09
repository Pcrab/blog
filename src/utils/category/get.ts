import initDb from "@utils/initDb";
import { getAllPosts } from "@utils/post/get";
import type { Post } from "@utils/post/get";
import type { CategorySchema } from "@utils/schemas/Category";

interface Category extends CategorySchema {
    posts: Post[];
}

let __ALL_CATEGORIES__: Category[] | null = null;

const getAllCategories = (): Category[] => {
    if (__ALL_CATEGORIES__) {
        return __ALL_CATEGORIES__;
    }
    const db = initDb();
    const posts = getAllPosts();
    const categories: Category[] = db.Category.map((category) => {
        return {
            ...category,
            posts: posts.filter((post) => {
                return post.category === category.name;
            }),
        };
    });
    __ALL_CATEGORIES__ = categories;
    return __ALL_CATEGORIES__;
};

const getCategoryByName = (categoryName: string): Category => {
    const category = getAllCategories().find((category) => {
        return category.name === categoryName;
    });
    if (!category) throw new Error(`Category ${categoryName} not found`);
    return category;
};

export { getAllCategories, getCategoryByName };
