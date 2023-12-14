import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { ApiTags } from "@nestjs/swagger";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./auths.decorator";

@ApiTags('Auths Controller')
@Controller('auths')
export class AuthsController {
    constructor(private authService: AuthsService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}