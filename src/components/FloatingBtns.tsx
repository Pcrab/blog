// import { createEffect, createSignal } from "solid-js";
import type { JSXElement } from "solid-js";

const FloatingBtns = (): JSXElement => {
    const scrollCommonCss =
        "select-none px-4 py-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 border-none hover:border-none shadow-2xl text-xl";
    // const themeCommonCss =
    //     "flex p-6 w-full h-8 text-lg items-center dark:hover:bg-gray-500 hover:bg-gray-300 ";
    // const [show, setShow] = createSignal(false);
    // const [innerClicked, setInnerClicked] = createSignal(false);
    // const [currentTheme, setCurrentTheme] = createSignal(
    //     localStorage.getItem("theme") ?? "auto",
    // );
    // createEffect(() => {
    //     document.documentElement.addEventListener("click", () => {
    //         setTimeout(() => {
    //             if (show() && innerClicked()) {
    //                 setInnerClicked(false);
    //             } else {
    //                 setShow(false);
    //             }
    //         }, 0);
    //     });
    // });
    // createEffect(() => {
    //     if (currentTheme() === "light") {
    //         document.documentElement.classList.remove("dark");
    //     } else if (currentTheme() === "dark") {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //             document.documentElement.classList.add("dark");
    //         } else {
    //             document.documentElement.classList.remove("dark");
    //         }
    //     }
    //     localStorage.setItem("theme", currentTheme());
    // });
    return (
        <div class="fixed flex flex-col right-6 bottom-8" aria-hidden>
            {/* <div
                aria-hidden
                class="relative m-auto mb-5 w-9 h-9 rounded-full border-4 border-gray-600 dark:border-gray-100 cursor-pointer bg-gradient-to-r from-gray-50 from-50% via-gray-600 via-50% to-gray-600 shadow"
                onClick={(): void => {
                    if (!show()) {
                        setShow(true);
                        setInnerClicked(true);
                    } else {
                        setShow(false);
                    }
                }}
            >
                {show() && (
                    <div class="relative right-48 bottom-5 w-40 bg-gray-50 dark:bg-gray-950 rounded-2xl shadow-2xl">
                        <button
                            class={`rounded-t-2xl ${themeCommonCss}${
                                currentTheme() === "auto"
                                    ? " text-red-800 dark:text-red-300"
                                    : ""
                            }`}
                            onClick={(): void => {
                                setCurrentTheme("auto");
                            }}
                        >
                            <svg
                                class="mr-4"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path
                                    d="M682.666667 804.571429v73.142857H341.333333v-73.142857h341.333334z m170.666666-658.285715a73.142857 73.142857 0 0 1 73.142857 73.142857v463.238096a73.142857 73.142857 0 0 1-73.142857 73.142857H170.666667a73.142857 73.142857 0 0 1-73.142857-73.142857V219.428571a73.142857 73.142857 0 0 1 73.142857-73.142857h682.666666z m-170.666666 268.190476H341.333333v73.142858h341.333334v-73.142858z"
                                    p-id="4624"
                                ></path>
                            </svg>
                            跟随系统
                        </button>
                        <button
                            class={`${themeCommonCss}${
                                currentTheme() === "light" ? "text-red-800" : ""
                            }`}
                            onClick={(): void => {
                                setCurrentTheme("light");
                            }}
                        >
                            <svg
                                class="mr-4"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path d="M863.973001 448.017999c-14.591544 0-27.007156 4.303866-36.942846 9.711697a317.190088 317.190088 0 0 0-18.911409-66.733915c6.367801-10.767664 14.655542-21.471329 24.687229-27.279147 35.102903-20.271367 52.270367 6.783788 99.132902-20.287366 25.103216-14.495547 38.254805-61.726071 23.423268-87.437268-103.05278 59.51814-115.996375-6.927784-170.55467 24.575232a76.573607 76.573607 0 0 0-27.023156 26.655167 321.829943 321.829943 0 0 0-49.838442-47.822505c0.095997-12.575607 1.903941-26.127184 7.743758-36.238868 20.271367-35.118903 48.65448-20.287366 75.709634-67.133902 14.495547-25.103216 2.271929-72.573732-23.423268-87.421268-59.502141 103.05278-103.932752 52.014375-135.419768 106.57267a76.733602 76.733602 0 0 0-10.063686 36.830849 316.950095 316.950095 0 0 0-67.021905-16.703478c-6.223806-10.959658-11.487641-23.567264-11.487641-35.278898 0-40.542733 31.999-41.886691 31.999-95.997C575.982001 35.022906 541.647074 0.016 511.984 0.016c0 119.004281-63.998 97.004969-63.998 160.010999 0 14.591544 4.303866 26.991157 9.695697 36.926846-23.167276 3.967876-45.534577 10.23968-66.717915 18.911409-10.767664-6.351802-21.471329-14.639543-27.263148-24.671229-20.271367-35.118903 6.767789-52.270367-20.287366-99.132902C328.917721 66.925909 281.687197 53.77432 255.992 68.605856c59.502141 103.05278-6.927784 116.012375 24.575232 170.57067a76.829599 76.829599 0 0 0 26.655167 27.023155 321.829943 321.829943 0 0 0-47.822505 49.838443c-12.591607-0.095997-26.127184-1.903941-36.238868-7.743758-35.118903-20.287366-20.271367-48.65448-67.133902-75.709634-25.119215-14.495547-72.605731-2.271929-87.437267 23.423268 103.05278 59.502141 51.998375 103.932752 106.55667 135.435767a76.7976 76.7976 0 0 0 36.846848 10.063686 317.910065 317.910065 0 0 0-16.703478 67.021905c-10.975657 6.223806-23.583263 11.487641-35.294897 11.487641-40.542733 0-41.870692-31.999-95.997-31.999-29.007094 0-63.998 34.318928-63.998 63.982001 118.988282 0 97.004969 64.014 159.995 64.014 14.591544 0 27.007156-4.303866 36.942846-9.711697 3.967876 23.167276 10.23968 45.518578 18.895409 66.701916-6.351802 10.767664-14.639543 21.487329-24.687228 27.295147-35.118903 20.271367-52.270367-6.783788-99.132902 20.287366-25.119215 14.479548-38.270804 61.726071-23.423268 87.405268 103.05278-59.502141 115.996375 6.927784 170.570669-24.575232a76.669604 76.669604 0 0 0 27.023156-26.639167 320.997969 320.997969 0 0 0 49.838442 47.806506c-0.111997 12.591607-1.903941 26.127184-7.743758 36.254867-20.271367 35.118903-48.65448 20.271367-75.709634 67.133902-14.495547 25.103216-2.271929 72.589732 23.423268 87.421268 59.502141-103.03678 103.932752-51.998375 135.419768-106.540671a76.845599 76.845599 0 0 0 10.063686-36.862848c21.375332 7.871754 43.758633 13.535577 67.005906 16.703478 6.223806 10.975657 11.503641 23.583263 11.50364 35.310897 0 40.542733-31.999 41.870692-31.999 95.997 0 29.007094 34.318928 63.998 63.998 63.998 0-119.004281 63.998-97.004969 63.998001-159.995 0-14.607544-4.303866-27.007156-9.711697-36.958845a318.246055 318.246055 0 0 0 66.717915-18.89541c10.767664 6.351802 21.487329 14.639543 27.279148 24.687229 20.271367 35.118903-6.767789 52.270367 20.287366 99.132902 14.495547 25.119215 61.726071 38.270804 87.421268 23.439267-59.502141-103.05278 6.927784-116.012375-24.575232-170.570669a76.701603 76.701603 0 0 0-26.655167-27.023156 321.829943 321.829943 0 0 0 47.822505-49.838442c12.575607 0.095997 26.127184 1.903941 36.238868 7.743758 35.118903 20.287366 20.271367 48.65448 67.133902 75.709634 25.119215 14.479548 72.589732 2.271929 87.437267-23.423268-103.05278-59.502141-51.998375-103.932752-106.55667-135.419768a76.605606 76.605606 0 0 0-36.846848-10.063686 318.006062 318.006062 0 0 0 16.703478-67.005906c10.975657-6.239805 23.583263-11.503641 35.294897-11.50364 40.542733 0 41.870692 31.999 95.997 31.999 29.007094 0 63.998-34.334927 63.998-63.998-118.988282 0-96.988969-63.998-159.995-63.998001z"></path>
                            </svg>
                            保持浅色
                        </button>
                        <button
                            class={`rounded-b-2xl ${themeCommonCss}${
                                currentTheme() === "dark" ? "text-red-300" : ""
                            }`}
                            onClick={(): void => {
                                setCurrentTheme("dark");
                            }}
                        >
                            <svg
                                class="mr-4"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                            >
                                <path d="M935.538601 630.40178c-11.43005-11.432249-28.673759-14.738607-43.531086-8.353536-46.733115 20.10317-96.362866 30.296859-147.50719 30.296859-99.589478 0-193.221796-38.783705-263.640252-109.20316-108.636744-108.636744-139.609745-270.022125-78.9083-411.148441 6.388069-14.85233 3.078713-32.098837-8.353536-43.532285-11.432249-11.432249-28.675758-14.743604-43.532285-8.354536-52.637312 22.64025-100.017388 54.809439-140.82552 95.616372-85.346135 85.346135-132.346869 198.821199-132.346869 319.519766 0 120.699566 47.001733 234.172631 132.347868 319.518766s198.821199 132.349067 319.517567 132.349067c120.699566 0 234.172431-47.002932 319.520765-132.351066 40.808132-40.810131 72.977122-88.190207 95.615373-140.82552C950.282205 659.081735 946.971849 641.834029 935.538601 630.40178z"></path>
                            </svg>
                            保持深色
                        </button>
                    </div>
                )}
            </div> */}
            <button
                class={`rounded-t-2xl ${scrollCommonCss}`}
                onClick={(): void => {
                    scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                ▲
            </button>
            <button
                class={`rounded-b-2xl ${scrollCommonCss}`}
                onClick={(): void => {
                    scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "smooth",
                    });
                }}
            >
                ▼
            </button>
        </div>
    );
};

export default FloatingBtns;