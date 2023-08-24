import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: true })
    firstname: string;

    @Column({ length: 50, nullable: true })
    lastname: string;

    @Column({ length: 100, nullable: true })
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
    deleteAt: Date;
}
