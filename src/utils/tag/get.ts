import initDb from "@utils/initDb";
import { getAllPosts } from "@utils/post/get";
import type { Post } from "@utils/post/get";
import type { TagSchema } from "@utils/schemas";

interface Tag extends TagSchema {
    posts: Post[];
}

let __ALL_TAGS__: Tag[] | null = null;

const getAllTags = (): Tag[] => {
    if (__ALL_TAGS__) {
        return __ALL_TAGS__;
    }
    const db = initDb();
    const posts = getAllPosts();
    const tags: Tag[] = db.Tag.map((tag) => {
        return {
            ...tag,
            posts: posts.filter((post) => {
                return (
                    post.tags.findIndex((postTag) => {
                        return postTag === tag.name;
                    }) !== -1
                );
            }),
        };
    }).sort((a, b) => {
        return b.posts.length - a.posts.length;
    });
    __ALL_TAGS__ = tags;
    return __ALL_TAGS__;
};

const getTagByName = (tagName: string): Tag => {
    const tag = getAllTags().find((tag) => {
        return tag.name === tagName;
    });
    if (!tag) throw new Error(`Tag ${tagName} not found`);
    return tag;
};

export { getAllTags, getTagByName };
