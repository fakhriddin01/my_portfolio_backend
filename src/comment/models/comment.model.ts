import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "../../post/models/post.model";

interface CommentCreatAttr {
    username: string;
    post_id: number;
    content: string;
    isAllowed: boolean;
}

@Table({tableName:'comment'})
export class Comment extends Model<Comment, CommentCreatAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    username: string;

    @ForeignKey(()=>Post)
    @Column({
        type:DataType.INTEGER,
        
    })
    post_id: number;

    @Column({
        type:DataType.TEXT,
    })
    content: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    isAllowed: boolean;

    @BelongsTo(()=>Post)
    post: Post
}
