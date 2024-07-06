import db from "../../db.json";
import type {
    CategorySchema,
    PostCategorySchema,
    PostSchema,
    PostTagSchema,
    TagSchema,
} from "./schemas";

interface Database {
    Post: PostSchema[];
    PostCategory: PostCategorySchema[];
    Category: CategorySchema[];
    PostTag: PostTagSchema[];
    Tag: TagSchema[];
}

let __DB_INSTANCE__: Database | null = null;

const initDb = (): Database => {
    if (__DB_INSTANCE__) {
        return __DB_INSTANCE__;
    }
    __DB_INSTANCE__ = {
        Post: db.models.Post,
        PostCategory: db.models.PostCategory,
        Category: db.models.Category,
        PostTag: db.models.PostTag,
        Tag: db.models.Tag,
    };
    return __DB_INSTANCE__;
};

export default initDb;
