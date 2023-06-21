import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ExperienceCreateAttr {
    position: string;
    start: Date;
    end: Date;
    description: string;
    company: string;
}

@Table({tableName:'experience'})
export class Experience extends Model<Experience, ExperienceCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    position: string;

    @Column({
        type:DataType.DATE,
    })
    start: Date;

    @Column({
        type:DataType.DATE,
    
    })
    end: Date;

    @Column({
        type:DataType.TEXT,
    
    })
    description: string;

    @Column({
        type:DataType.STRING,
    })
    company: string;
}
