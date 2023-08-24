import { ResponseObjectDto } from './response-object.dto';
import { ResponseArrayDto } from './response-array.dto';

export interface MapperResponse<T> {
    toObject(code: number, msg: string, result: T): ResponseObjectDto<T>;

    toArray(code: number, msg: string, result: T[]): ResponseArrayDto<T>;
}
