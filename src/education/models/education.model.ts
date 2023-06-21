import { Column, DataType, Model, Table } from "sequelize-typescript";

interface EducationCreateAttr {
    start: Date;
    end: Date;
    organization: string;
    major: string;
}

@Table({tableName:'education'})
export class Education extends Model<Education, EducationCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

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
    organization: string;

    @Column({
        type:DataType.STRING,
    })
    major: string;   
}
