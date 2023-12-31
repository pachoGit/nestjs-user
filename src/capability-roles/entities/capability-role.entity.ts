import { User } from '@app/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CapabilityRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: true })
    name: string;

    @Column({ length: 200, nullable: true })
    description: string;

    @Column({ default: 1 })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    // Relations
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
