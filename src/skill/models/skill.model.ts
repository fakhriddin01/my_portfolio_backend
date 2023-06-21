import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SkillCreatAttr {
    name: string;
}


@Table({tableName: "skill"})
export class Skill extends Model<Skill, SkillCreatAttr>{

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
}
