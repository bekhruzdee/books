import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const user = this.userRepository.create();
    user.username = createAuthDto.username;
    user.password = await bcrypt.hash(createAuthDto.password, 10);
    user.fullname = createAuthDto.fullname;
    await this.userRepository.save(user);

    return 'You are registered✅';
  }

  async login(loginDto: { username: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!user) {
      throw new NotFoundException('User Not Found ⚠️');
    }
    const checkPass = await bcrypt.compare(loginDto.password, user.password);
    if (!checkPass) {
      throw new NotFoundException('Password Error ⚠️');
    }

    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.sign(payload);
    const { password, ...userdata } = user;
    return { userdata, token };
  }

  async getAllMyData(payload: any) {
    const user = await this.userRepository.findOneBy({ id: payload.id });
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
