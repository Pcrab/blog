import { parse } from "node-html-parser";

export interface PostTocNode {
    name: string;
    children: {
        name: string;
    }[];
}

const parseToc = (content: string): PostTocNode[] => {
    const html = parse(content);
    const toc: { name: string; children: { name: string }[] }[] = [];
    for (const h of html.querySelectorAll("h2,h3")) {
        const name = h.id;
        const level = Number.parseInt(h.tagName[1] ?? "", 10);
        if (level === 2) {
            toc.push({ name, children: [] });
        } else if (level === 3) {
            const last = toc[toc.length - 1];
            if (last !== undefined) {
                last.children.push({ name });
            }
        }
    }
    return toc;
};

export default parseToc;
