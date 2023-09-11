import {
    IsAlpha,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Length,
    MaxLength,
} from 'class-validator';
import { Exists } from '@global/validators/exists';
import { User } from '../entities/user.entity';
import { CapabilityRole } from '@capability/roles/entities/capability-role.entity';
import { ExistsIn } from '@global/validators/exists-in';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3, 50, {
        message: 'El campo nombres debe tener entre 3 y 50 caracteres',
    })
    // @IsAlpha(undefined, {
    //     message: 'El campo nombres solo debe tener letras',
    // })
    firstname: string;

    @IsNotEmpty()
    @Length(3, 50, {
        message: 'El campo apellidos debe tener entre 3 y 50 caracteres',
    })
    @IsAlpha(undefined, {
        message: 'El campo apellidos solo debe tener letras',
    })
    lastname: string;

    @IsEmail(undefined, {
        message: 'El campo correo debe tener un formato válido',
    })
    @MaxLength(100, {
        message: 'El campo correo debe tener menos de 100 caracteres',
    })
    @Exists(User, 'email')
    email: string;

    @MaxLength(11, {
        message: 'El campo teléfono debe tener menos de 11 caracteres',
    })
    // @IsPhoneNumber(undefined, {
    //     message: 'El campo teléfono debe tener un formato válido',
    // })
    phone: string;

    @ExistsIn(CapabilityRole, 'id')
    capability_roles: number[];
}
