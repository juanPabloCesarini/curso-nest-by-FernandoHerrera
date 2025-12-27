import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositrory:Repository<User>
  ) { }

 async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepositrory.create(createUserDto);
      await this.userRepositrory.save(user)
      return user
    } catch (error) {
      this.handlerDBErrors(error);

    }
  }

  private handlerDBErrors(error:any): never{
    if (error.code ==='23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs')
  }

  

}
