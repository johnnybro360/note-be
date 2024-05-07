import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import {AuthDto} from "./dto/auth.dto";
import {PrismaService} from "prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {jwtSecret} from "../utils/constants";
import {Request, Response} from "express";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
                private jwt: JwtService) {
    }

    async signUp(dto: AuthDto) {
        const {email, password} = dto;
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (foundUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await this.hashPassword(password);

        await this.prisma.user.create({
            data: {
                email,
                hashedPassword
            }
        })

        return {message: 'signup was successful'};
    }

    async signIn(dto: AuthDto, req: Request, res: Response) {
        const {email, password} = dto;
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!foundUser) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const isMatch = await this.comparePasswords({password, hash: foundUser.hashedPassword});

        if (!isMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const token = await this.signToken({id: foundUser.id, email: foundUser.email});

        if (!token) {
            throw new ForbiddenException()
        }

        res.cookie('token', token)

        return res.send({message: 'Logged in successfully'});
    }

    async logOut(req: Request, res: Response) {
        res.clearCookie('token');
        return res.send({message: 'Logged out successfully'});
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(args: { password: string, hash: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: { id: string, email: string}) {
        return await this.jwt.signAsync(args, {
            secret: jwtSecret,
        });
    }
}