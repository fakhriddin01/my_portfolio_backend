import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "../../comment/models/comment.model";

interface PostCreateAttr {
    title: string;
    content: string;
    tag: string;
    short: string;
    isActive: boolean;
}

@Table({tableName:'post'})
export class Post extends Model<Post, PostCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    title: string;

    @Column({
        type:DataType.TEXT,
    })
    content: string;
    
    @Column({
        type:DataType.TEXT,
    })
    short: string;

    @Column({
        type:DataType.TEXT,
    })
    tag: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    isActive: boolean;

    @HasMany(()=>Comment, { onDelete: 'CASCADE', hooks: true })
    comments: Comment[]
}
