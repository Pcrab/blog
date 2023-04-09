import { BASE_TITLE } from "./constants";

const buildTitle = (title?: string): string => {
    if (!title) {
        return BASE_TITLE;
    }
    return `${title} | ${BASE_TITLE}`;
};

export default buildTitle;
