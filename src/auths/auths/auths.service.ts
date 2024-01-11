import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { User } from "src/users/entities/user.entity";
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

    async signUp(username: string, pass: string): Promise<any> {
        const dataUser = new User();
        dataUser.username = username;
        dataUser.password = pass;
        const user = await this.userService.create(dataUser);
        await this.userService.addRole(user, 2);
        return this.signIn(username, pass);
    }

    async signInGoogle(token: string) {
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
        );
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const profile = ticket.getPayload();

        const user = await this.userService.findOne({ username: profile['email'] });
        const payload = {
            id: user.id,
            username: user.username,
            userRoles: user.userRoles
        }

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    async signUpGoogle(token: string) {
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
        );
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const profile = ticket.getPayload();

        return this.signUp(
            profile['email'], // username
            Math.random().toString(36).slice(-8) // random password
        )
    }

}