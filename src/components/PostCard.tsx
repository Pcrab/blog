import type { JSXElement } from "solid-js";
import type { Post } from "src/utils/post/get";

const PostCard = (props: { post: Post }): JSXElement => {
    const { post } = props;
    const date = post.date;
    const jumpUrl = `/post/${post.slug}`;
    // const year = date.year().toString() + "年";
    // let month = "";
    // switch (date.month() + 1) {
    //     case 1:
    //         month = "一月";
    //         break;
    //     case 2:
    //         month = "二月";
    //         break;
    //     case 3:
    //         month = "三月";
    //         break;
    //     case 4:
    //         month = "四月";
    //         break;
    //     case 5:
    //         month = "五月";
    //         break;
    //     case 6:
    //         month = "六月";
    //         break;
    //     case 7:
    //         month = "七月";
    //         break;
    //     case 8:
    //         month = "八月";
    //         break;
    //     case 9:
    //         month = "九月";
    //         break;
    //     case 10:
    //         month = "十月";
    //         break;
    //     case 11:
    //         month = "十一月";
    //         break;
    //     case 12:
    //         month = "十二月";
    //         break;
    //     default:
    //         throw new Error("Invalid month");
    // }
    // const day = date.date().toString() + "日";
    return (
        <div class="my-10 bg-gray-200 dark:bg-gray-700 p-10 sm:p-4 rounded-xl">
            <div class="relative -left-4">
                <b>「</b>
                {` ${date.format("YYYY 年 MM 月 DD 日")} `}
                <b>」</b>
            </div>
            <div class="font-bold text-2xl my-2">
                <a href={jumpUrl}>{post.title}</a>
            </div>
            <div class="flex my-3 flex-wrap">
                {post.category && (
                    <a
                        class="mr-5 text-[color:var(--normal)] hover:text-[color:var(--hover)] dark:text-[color:var(--hover)] dark:hover:text-[color:var(--normal)] font-bold"
                        href={`/category/${post.category}/1`}
                    >
                        {post.category}
                    </a>
                )}
                {post.tags.map((tag) => (
                    <a
                        class="text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 font-bold mr-5"
                        href={`/tag/${tag}/1`}
                    >
                        {tag}
                    </a>
                ))}
            </div>
            <div
                class="prose-a:border-b-2 prose-a:border-b-[color:var(--normal)] hover:prose-a:border-b-[color:var(--hover)]"
                innerHTML={post.excerpt}
            ></div>
            <div class="mt-3 font-bold">
                <a href={jumpUrl}>阅读更多 ...</a>
            </div>
        </div>
    );
};

export default PostCard;
