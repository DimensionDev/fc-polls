export interface NextPageProps<Params = never, SearchParams = never> {
    params: Params extends never ? never : Promise<Params>;
    searchParams: SearchParams extends never ? never : Promise<SearchParams>;
}
