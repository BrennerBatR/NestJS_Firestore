
import { ApiModelProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsBoolean } from 'class-validator';


export class Product {

  @ApiModelProperty()
  id?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  code: string;
  
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiModelProperty()
  @IsNotEmpty()
  scoringRuleID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  score: string;

  @ApiModelProperty()
  @IsNotEmpty()
  extraScore: string;

  @ApiModelProperty()
  @IsBoolean()
  activated: boolean;

  @ApiModelProperty()
  @IsNotEmpty()
  storeID: string;

  @ApiModelProperty()
  imageURL?: string; 
  
  
}
