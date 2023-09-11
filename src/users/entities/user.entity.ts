import { CapabilityRole } from '@app/capability-roles/entities/capability-role.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: true })
    firstname: string;

    @Column({ length: 50, nullable: true })
    lastname: string;

    @Column({ length: 100, nullable: true, unique: true })
    email: string;

    @Column({ length: 11, nullable: true })
    phone: string;

    @Column({ default: 1 })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    // Relations
    @ManyToMany(() => CapabilityRole, (role) => role.users)
    @JoinTable({
        name: 'many_role_user',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles?: CapabilityRole[];
}
