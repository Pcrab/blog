import type { JSXElement } from "solid-js";

const PaginationItem = (props: {
    url: string;
    selected: boolean;
    content: string;
    class?: string;
}): JSXElement => {
    return (
        <div class={`${props.class ?? ""}} mx-4`}>
            {props.selected ? (
                <div>{props.content}</div>
            ) : (
                <a href={props.url}>{props.content}</a>
            )}
        </div>
    );
};

const Pagination = (props: {
    total: number;
    baseUrl: string;
    current: number;
}): JSXElement => {
    const { total, baseUrl, current } = props;
    if (total === 1) return <></>;
    if (total < 5)
        return (
            <div class="flex justify-center items-center text-xl">
                {Array.from({ length: total }).map((_, index) => {
                    return (
                        <PaginationItem
                            url={`${baseUrl}${index + 1}`}
                            selected={current === index + 1}
                            content={(index + 1).toString()}
                        />
                    );
                })}
            </div>
        );
    let contents = [];
    if (current < 3) {
        contents = [2, 3, 4];
    } else if (current > total - 2) {
        contents = [total - 3, total - 2, total - 1];
    } else {
        contents = [current - 1, current, current + 1];
    }
    return (
        <div class="flex justify-center">
            <PaginationItem
                url={`${baseUrl}1`}
                selected={current === 1}
                content={"1"}
            />
            {current > 3 && "..."}
            {contents.map((index) => {
                return (
                    <PaginationItem
                        url={`${baseUrl}${index}`}
                        selected={index === 1}
                        content={index.toString()}
                    />
                );
            })}
            {current < total - 3 && "..."}
            <PaginationItem
                url={`${baseUrl}${total}`}
                selected={current === contents.length}
                content={total.toString()}
            />
        </div>
    );
};

export default Pagination;
