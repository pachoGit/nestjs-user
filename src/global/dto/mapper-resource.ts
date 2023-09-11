import { Paginated } from 'nestjs-paginate';

/**
 * Interface for transforming Entity data to be presented by controllers
 */
export interface MapperResource {
    /**
     * Transform a single Entity for present
     *
     * @param data Entity to transform
     *
     * @returns Transformed object
     */
    toShow(data: any): any;

    /**
     * Transform an array of Entity for present
     *
     * @param data Array of entity to transform
     *
     * @returns Array transformed object
     */
    toShowArray(data: any[]): any[];

    /**
     * Transform a paginated Entity for present
     *
     * @param data Array of entity to transform
     *
     * @returns Array transformed object
     */
    toShowPaginated(data: Paginated<any>): Paginated<any>;
}
