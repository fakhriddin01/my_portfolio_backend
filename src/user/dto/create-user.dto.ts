import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional, IsNumber} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    nickname: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
