import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`register`)
  create(@Body() createAuthDto: CreateAuthDto) {
    
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)

  @Get(`me`)
  getMyData(@Req() req: Request) {
    const payload = req[`payload`]
    return this.authService.getAllMyData(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
