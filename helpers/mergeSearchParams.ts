export const mergeSearchParams = (
    searchParams: URLSearchParams,
    newParams: Record<string, string>,
    exclude: string[] = [],
) => {
    const mergedParams = new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        ...newParams,
    });
    exclude.forEach((key) => mergedParams.delete(key));
    return mergedParams;
};
