import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional, IsNumber} from "class-validator";

export class CreateExperienceDto {
    @IsNotEmpty()
    @IsString()
    position: string;
    @IsNotEmpty()
    @IsDate()
    start: Date;
    @IsNotEmpty()
    @IsDate()
    end: Date;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsString()
    company: string;
}
