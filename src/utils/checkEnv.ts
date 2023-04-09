const isProduction = (): boolean => {
    return process.env.NODE_ENV === "production";
};

export { isProduction };
