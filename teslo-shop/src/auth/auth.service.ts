import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositrory: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepositrory.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepositrory.save(user)
      //delete user.password;
      return user
    } catch (error) {
      this.handlerDBErrors(error);

    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepositrory.findOne({
      where: { email },
      select: { email: true, password: true }
    })
    
    if (!user)
      throw new UnauthorizedException('Credenciales inválidas')
    

    if (bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales inválidas')

    return user;
  }

  private handlerDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs')
  }



}
