export interface IPagination<T>{
    total_items: number,
    total_pages: number,
    page: number,
    results: T[],
    total_results: number
}