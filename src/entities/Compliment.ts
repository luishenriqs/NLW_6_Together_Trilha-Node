import { 
    Entity,
    Column, 
    PrimaryColumn, 
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { Tag } from './Tags';

@Entity('compliments')
class Compliment {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender: string;

    @JoinColumn({ name: "user_sender" })
    @ManyToOne(() => User)
    userSender: User;

    @Column()
    user_receiver: string;

    @JoinColumn({ name: "user_receiver" })
    @ManyToOne(() => User)
    userReceiver: User;

    @Column()
    tag_id: string;

    @JoinColumn({ name: "tag_id" })
    @ManyToOne(() => Tag)
    tag: Tag;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        };
    }
};

export { Compliment };
