import { IsIn } from 'class-validator';

export class ChangeStatusUserDto {
    @IsIn([0, 1, 2, 3], {
        message:
            'El campo estado debe ser uno de los siguientes valores: 0, 1, 2, 3',
    })
    status: number;
}
