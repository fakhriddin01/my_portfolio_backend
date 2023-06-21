import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ContactCreatAttr {
    name: string;
    link: string;
    icon: string;
}

@Table({tableName:'contact'})
export class Contact extends Model<Contact, ContactCreatAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    name: string;

    @Column({
        type:DataType.TEXT,
    })
    link: string;

    @Column({
        type:DataType.TEXT,
    })
    icon: string;
}
