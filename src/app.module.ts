import { Module} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './auths/roles/entities/role.entity';
import { RolesModule } from './auths/roles/roles.module';
import { Product } from './products/entities/product.entity';
import { Shop } from './shops/entities/shop.entity';
import { UserRole } from './users/entities/user-role.entity';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { AuthsModule } from './auths/auths/auths.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auths/auths/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRESQL_HOST'),
        port: parseInt(configService.get<string>('POSTGRESQL_PORT')),
        username: configService.get<string>('POSTGRESQL_USER'),
        password: configService.get<string>('POSTGRESQL_PASSWORD'),
        database: configService.get<string>('POSTGRESQL_DATABASE'),
        entities: [User, Role, Shop, Product, UserRole],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    RolesModule,
    ShopsModule,
    ProductsModule,
    AuthsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
