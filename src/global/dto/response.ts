import { MapperResponse } from './mapper-response';
import { ResponseArrayDto } from './response-array.dto';
import { ResponseObjectDto } from './response-object.dto';

export class GeneralResponse<T> implements MapperResponse<T> {
    toObject(code: number, msg: string, result: T): ResponseObjectDto<T> {
        return new ResponseObjectDto<T>(code, msg, result);
    }

    toArray(code: number, msg: string, result: T[]): ResponseArrayDto<T> {
        return new ResponseArrayDto<T>(code, msg, result);
    }
}
