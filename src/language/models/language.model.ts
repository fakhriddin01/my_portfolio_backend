import { Column, DataType, Model, Table } from "sequelize-typescript";

interface LangCreateAttr {
    name: string;
    level: string;
}

@Table({tableName: 'language'})
export class Language extends Model<Language, LangCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        unique: true
    })
    name: string;

    @Column({
        type:DataType.STRING,
    })
    level: string;
}
