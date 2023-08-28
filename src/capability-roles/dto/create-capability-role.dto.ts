import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateCapabilityRoleDto {
    @IsNotEmpty({
        message: 'El campo nombre es requrerido',
    })
    @Length(3, 100, {
        message: 'El campo nombre debe tener entre 3 y 100 caracteres',
    })
    name: string;

    @MaxLength(100, {
        message: 'El campo descripción debe tener menos de 100 caracteres',
    })
    description: string;
}
