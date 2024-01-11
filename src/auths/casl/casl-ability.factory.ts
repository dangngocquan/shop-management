import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Action } from "./actions.enum";
import { User } from "src/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Shop } from "src/shops/entities/shop.entity";
import { UsersService } from "src/users/users.service";
import { Role } from "../roles/roles.enum";

type Subjects = InferSubjects<typeof User | typeof Shop> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    private userService: UsersService, 
  ) {}

  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const userRoles = await this.userService.getUserRoles({ userId: user.id });
    const roleNames = userRoles.map((userRole) => userRole.role.name);
    if (roleNames.includes(Role.Admin)) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, Shop, {ownerId : user.id})
    can(Action.Delete, Shop, {ownerId : user.id})

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}