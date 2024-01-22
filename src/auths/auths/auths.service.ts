import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { MailService } from "../mail/mail.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthsService {
    constructor(
        private userService: UsersService,
        private mailService: MailService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
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

    async verifyOtpSignUp(email: string, otp: string): Promise<any> {
        // Check email and otp in Cache
        const user = await this.cacheManager.get(email + "-" + otp);
        if (user === null || user === undefined) {
            throw new UnauthorizedException();
        }
        // Create user in database
        const dataUser = new User();
        dataUser.username = user['username'];
        dataUser.password = user['password'];
        const u = await this.userService.create(dataUser);
        await this.userService.addRole(u, 2);
        // Login
        return this.signIn(u.username, u.password);
    }

    async signUp(username: string, pass: string): Promise<any> {
        // check existed user
        const u = await this.userService.findOne({ username });
        if (u !== undefined && u !== null) {
            throw new ConflictException();
        }
        // Create otp
        const otp: string = (1000000 +  Math.round(Math.random() * 999999)).toString().slice(1);
        // Save to Cache
        await this.cacheManager.set(
            username + "-" + otp, 
            {
                username: username, 
                password: pass
            },
            300000
        );
        // Send verify email
        return this.mailService.sendEmailConfirmation(username, otp);
    }
    
    // Check username (email of user) and send OTP code to email
    async forgetPasswordStep1(username: string): Promise<any> {
        // check existed user
        const u = await this.userService.findOne({ username });
        if (u === undefined || u == null) {
            throw new ConflictException();
        }
        // Create OTP code
        const otp: string = (1000000 +  Math.round(Math.random() * 999999)).toString().slice(1);
        // Save to Cache
        await this.cacheManager.set(
            username + "--" + otp, 
            {
                username: username
            },
            300000 // 300s
        );
        // Send verify email
        return this.mailService.sendEmailConfirmation(username, otp);
    }

    // Verify OTP code and email, return a sercurity token if successful
    async forgetPasswordStep2(email: string, otp: string): Promise<any> {
        // Check email and otp in Cache
        const user = await this.cacheManager.get(email + "--" + otp);
        if (user === null || user === undefined) {
            throw new UnauthorizedException();
        }
        // Return sercurity token
        const u = await this.userService.findOne({ username: email });
        const payload = {
            id: u.id,
            username: u.username
        }

        return {
            sercurityToken: await this.jwtService.signAsync(payload),
        };
    }

    // Update password for user
    async forgetPasswordStep3(sercurityToken: string, newPass: string): Promise<any> {
        const user = await this.jwtService.verifyAsync(
            sercurityToken,
            {
                secret: jwtConstants.secret
            }
        );
        const u = new User();
        u.password = newPass;
        await this.userService.updatePassword(user['id'], u);
        
        // Login
        return this.signIn(user['username'], newPass);
    }

    async signInGoogle(token: string) {
        const profile = await this.verifyGoogle(token);

        const user = await this.userService.findOne({ username: profile['email'] });
        if (user === undefined || user === null) {
            return this.signUpGoogle(token);
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

    async signUpGoogle(token: string) {
        const profile = await this.verifyGoogle(token);

        const user = await this.userService.findOne({ username: profile['email'] });
        if (user !== undefined || user !== null) {
            return this.signInGoogle(token);
        }

        return this.signUp(
            profile['email'], // username
            Math.random().toString(36).slice(-8) // random password
        )
    }

    async verifyGoogle(token: string): Promise<{}> {
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
        );
        var ticket;
        try {
            ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
        
        return ticket.getPayload();
    }

    
}