import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, IsInt, IsBoolean, IsOptional, IsNumber} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsNumber()
    post_id: number;
    @IsNotEmpty()
    @IsString()
    content: string;
}
