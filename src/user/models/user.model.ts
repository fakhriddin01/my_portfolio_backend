import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Comment } from "../../comment/models/comment.model";

interface UserCreationAttr {
    nickname: string;
    hashed_password: string;
    hashed_token: string;
    isActive: boolean;
    email: string;
}

@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    nickname: string;

 

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_token: string;
    
    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })isActive: boolean;


    @Column({
        type:DataType.STRING,
    })
    email: string;


}
