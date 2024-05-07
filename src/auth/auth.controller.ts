import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto/auth.dto";
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
    async signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

  @Post('signin')
  async signIn(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signIn(dto, req, res);
  }

  @Get('logout')
  async signOut(@Req() req: Request, @Res() res: Response) {
    return this.authService.logOut(req, res);
  }
}
