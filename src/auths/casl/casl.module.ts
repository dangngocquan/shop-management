import { Module } from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [UsersModule],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
  })
  export class CaslModule {}