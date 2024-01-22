import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { ApiTags } from "@nestjs/swagger";
import { SignInSignUpDto } from "./dto/sign-in.dto";
import { Public } from "./auths.decorator";
import { SignInSignUpSocialDto } from "./dto/sign-in-social.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ForgetPasswordStep1Dto } from "./dto/forget-password-step-1.dto";
import { ForgetPasswordStep3Dto } from "./dto/forget-password-step-3.dto";



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
    @HttpCode(HttpStatus.OK)
    @Post('signup/verify-otp')
    verifyOtpSignUp(@Body() verifyOtp: VerifyOtpDto) {
        return this.authService.verifyOtpSignUp(verifyOtp.email, verifyOtp.otp);
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

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('forget-password-step-1')
    forgetPassword(@Body() forgetPasswordDto: ForgetPasswordStep1Dto) {
        return this.authService.forgetPasswordStep1(forgetPasswordDto.username);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('forget-password-step-2')
    verifyOtpForgetPassword(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.authService.forgetPasswordStep2(verifyOtpDto.email, verifyOtpDto.otp);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('forget-password-step-3')
    resetForgetPassword(@Body() resetForgetPasswordDto: ForgetPasswordStep3Dto) {
        return this.authService.forgetPasswordStep3(resetForgetPasswordDto.sercurityToken, resetForgetPasswordDto.password);
    }
}