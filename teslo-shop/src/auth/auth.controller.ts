import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/auth.entity';

import { RawHeaders, GetUser } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto:LoginUserDto){
    return this.authService.login(loginUserDto)

  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
   // @Req() request:Express.Request
   @GetUser() user:User,
   @GetUser('email') userEmail:string,
   @RawHeaders() rawHeaders:string[] 
  ){
    return {
      ok:true,
      message:'Hola mundo private',
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('private2')
  @SetMetadata('roles',['admin','super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser() user:User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders:string[] 
  ){
    return {
      ok:true,
      message:'Hola mundo private2',
      user,
      userEmail,
      rawHeaders
    }
  }

}