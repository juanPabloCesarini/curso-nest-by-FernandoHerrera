/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;
    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;
}
