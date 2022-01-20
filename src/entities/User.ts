import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Entity('user')
export class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    admin: boolean;
    default: false;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}
