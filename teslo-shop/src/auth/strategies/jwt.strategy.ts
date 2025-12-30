import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private readonly configService:ConfigService
        
    ){
        super({
            secretOrKey:configService.get('JWT_SECRET') as string,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload): Promise<User> {
        const {id}=payload;

        const user = await this. userRepository.findOneBy({id});

        if (!user)
            throw new UnauthorizedException('token not valid')

        if (!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with admin')
        return user;
    }
}