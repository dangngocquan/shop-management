import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { ApiTags } from "@nestjs/swagger";
import { SignInSignUpDto } from "./dto/sign-in.dto";
import { Public } from "./auths.decorator";
import { SignInSignUpSocialDto } from "./dto/sign-in-social.dto";



@ApiTags('Auths Controller')
@Controller('auths')
export class AuthsController {
    constructor(private authService: AuthsService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInSignUpDto: SignInSignUpDto) {
        return this.authService.signIn(signInSignUpDto.username, signInSignUpDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signInSignUpDto: SignInSignUpDto) {
        return this.authService.signUp(signInSignUpDto.username, signInSignUpDto.password);
    }

    @Public()
    @Post('google/login')
    async signInWithGoogle(@Body() signInSignUpSocialDto: SignInSignUpSocialDto): Promise<any> {
        return await this.authService.signInGoogle(signInSignUpSocialDto.token);
    }

    @Public()
    @Post('google/signup')
    async signUpWithGoogle(@Body() signInSignUpSocialDto: SignInSignUpSocialDto): Promise<any> {
        return await this.authService.signUpGoogle(signInSignUpSocialDto.token);
    }
}