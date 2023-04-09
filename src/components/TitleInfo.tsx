import type { JSXElement } from "solid-js";

const TitleInfo = (props: { children: JSXElement }): JSXElement => {
    return (
        props.children && (
            <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl">
                {props.children}
            </div>
        )
    );
};

export default TitleInfo;
