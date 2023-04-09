import posthtml from "posthtml";

const postHtml = async (html: string): Promise<string> => {
    const node = await posthtml()
        .use((node) => {
            return node;
        })
        .process(html);
    return node.html;
};

export default postHtml;
