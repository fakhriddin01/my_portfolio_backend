import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional, IsNumber} from "class-validator";


export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    link: string;
    @IsNotEmpty()
    @IsString()
    icon: string;
}
