import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthsService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne({ username });
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {
            id: user.id,
            username: user.username,
            userRoles: user.userRoles
        }

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

}