import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsInConstraint implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {}

    async validate(value: any, args: ValidationArguments) {
        const [entityClass, field] = args.constraints;
        const query = this.dataSource
            .getRepository(entityClass)
            .createQueryBuilder('table');
        const sql = `table.${field} IN (:...search)`;
        const result = await query.where(sql, { search: value }).getMany();
        return result.length == value.length;
    }

    defaultMessage(args: ValidationArguments) {
        return `El valor ${args.value} no existe en la entidad ${args.constraints[0].name}`;
    }
}

export function ExistsIn(
    entityClass: EntityTarget<ObjectLiteral>,
    field: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entityClass, field],
            validator: ExistsInConstraint,
        });
    };
}
