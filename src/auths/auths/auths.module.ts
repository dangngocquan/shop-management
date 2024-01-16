import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        UsersModule,
        MailModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' },
        }),
    ],
    controllers: [AuthsController],
    providers: [AuthsService],
    exports: [AuthsService],
})
export class AuthsModule {}