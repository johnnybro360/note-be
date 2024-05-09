import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async signUp(@Body() dto: AuthDto) {
    return await this.authService.signUp(dto);
  }

  @Post("signin")
  async signIn(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return await this.authService.signIn(dto, req, res);
  }

  @Get("logout")
  async signOut(@Req() req: Request, @Res() res: Response) {
    return await this.authService.logOut(req, res);
  }

  @Post("verify-token")
  async verifyToken(@Body() { token }: { token: string }, @Res() res: Response) {
    return await this.authService.verifyToken(token, res);
  }

  @Post("verify-token")
  async verifyToken(@Body() { token }: { token: string }, @Res() res: Response) {
    return await this.authService.verifyToken(token, res);
  }
}
