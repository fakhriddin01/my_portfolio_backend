import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ProjectCreatAttr {
    name: string;
    link: string;
    description: string;
    tag: string;
    workLink: string;
    image: string;
}

@Table({tableName: "project"})
export class Project extends Model<Project, ProjectCreatAttr> {
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
    tag: string;

    @Column({
        type:DataType.TEXT,
    })
    image: string;

    @Column({
        type:DataType.TEXT,
        defaultValue: null
    })
    workLink: string;

    @Column({
        type:DataType.TEXT,
    })
    description: string;

}
