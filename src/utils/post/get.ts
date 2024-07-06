import { basename } from "node:path";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import initDb from "../initDb";
import type { PostSchema } from "../schemas";

interface Post extends Omit<PostSchema, "date"> {
    tags: string[];
    date: Dayjs;
    category: string;
    prev?: Post | undefined;
    next?: Post | undefined;
}

let __ALL_POSTS__: Post[] | null = null;

const getAllPosts = (): Post[] => {
    if (__ALL_POSTS__) {
        return __ALL_POSTS__;
    }
    const db = initDb();
    const posts: Post[] = db.Post.map((post) => {
        return {
            ...post,
            date: dayjs(post.date),
            tags: [],
            category: "",
        };
    }).sort((postA, postB) => {
        return postB.date.diff(postA.date);
    });
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (!post) throw new Error();
        if (i !== 0) {
            post.prev = posts[i - 1];
        }
        if (i !== posts.length - 1) {
            post.next = posts[i + 1];
        }
    }

    const tags = db.Tag;
    for (const tag of tags) {
        const postIds = db.PostTag.filter((postTag) => {
            return tag._id === postTag.tag_id;
        }).map((postTag) => postTag.post_id);
        const postWithThisTag = posts.filter((post) =>
            postIds.includes(post._id),
        );
        for (const post of postWithThisTag) {
            post.tags.push(tag.name);
        }
    }

    const categories = db.Category;
    for (const category of categories) {
        const postIds = db.PostCategory.filter((postCategory) => {
            return category._id === postCategory.category_id;
        }).map((postCategory) => postCategory.post_id);
        const postWithThisCategory = posts.filter((post) =>
            postIds.includes(post._id),
        );
        for (const post of postWithThisCategory) {
            post.category = category.name;
        }
    }

    __ALL_POSTS__ = posts;
    return __ALL_POSTS__;
};

const getAllPostSlugs = (): string[] => {
    const posts = getAllPosts();
    return posts.map((post) => basename(post.slug));
};

const getLatestPosts = (): Post[] => {
    return getAllPosts().slice(0, 5);
};

const getPostBySlug = (slug: string): Post => {
    const post = getAllPosts().find((post) => post.slug === slug);
    if (!post) throw new Error("Post not found");
    return post;
};

const postPerPage = 10;
const getPostPageCount = (): number => {
    return Math.floor(getAllPosts().length / postPerPage) + 1;
};
const getPagePosts = (count: number): Post[] => {
    return getAllPosts().slice((count - 1) * postPerPage, count * postPerPage);
};

export type { Post };
export {
    getAllPosts,
    getAllPostSlugs,
    getLatestPosts,
    getPostBySlug,
    getPostPageCount,
    getPagePosts,
};
