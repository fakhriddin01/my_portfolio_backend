import { Column, DataType, Table, Model } from "sequelize-typescript";

interface AdminCreationAttr {
    first_name: string;
    last_name: string;
    hashed_password: string;
    avatar: string;
    hashed_token: string;
    isAdmin: boolean;
    email: string;
    phone: string;
}

@Table({tableName: "admin"})
export class Admin extends Model<Admin, AdminCreationAttr> {
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
    first_name: string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    last_name: string;

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
    })
    isAdmin: boolean;

    @Column({
        type:DataType.STRING,
    })
    avatar: string;

    @Column({
        type:DataType.STRING,
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    phone: string;

}
