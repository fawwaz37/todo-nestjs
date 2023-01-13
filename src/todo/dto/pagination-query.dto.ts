import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
