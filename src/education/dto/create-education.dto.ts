import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional, IsNumber} from "class-validator";


export class CreateEducationDto {
    @IsNotEmpty()
    start: Date;
    @IsNotEmpty()
    end: Date;
    @IsNotEmpty()
    @IsString()
    organization: string;
    @IsNotEmpty()
    @IsString()
    major: string;
}