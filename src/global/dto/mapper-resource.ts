export interface MapperResource {
    toShow(data: any): any;

    fromCreate(data: any): any;

    toShowArray(data: any[]): any[];
}
