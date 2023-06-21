import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional} from "class-validator";

export class UpdateAdminDto {
    @IsOptional()
    @IsString()
    first_name?: string;
    @IsOptional()
    @IsString()
    last_name?: string;
    @IsOptional()
    @IsString()
    email?:string;
    @IsOptional()
    @IsString()
    phone?:string;
}
