import { DbUser } from "modules/users/UserRepo";
import User from "modules/users/User";
import { EntityIdentifier } from "core";
import UserEmail from "./UserEmail";
import UserName from "./UserName";

export function toEntity(dbUser: DbUser): User {
  return User.create(
    {
      email: UserEmail.create(dbUser.email).value,
      firstName: UserName.create(dbUser.first_name).value,
      lastName: UserName.create(dbUser.last_name).value,
      salt: dbUser.salt,
      hash: dbUser.hash
    },
    new EntityIdentifier(dbUser.id)
  ).value;
}

export function toDb(user: User): DbUser {
  return {
    id: user.id.toValue(),
    email: user.props.email.value,
    first_name: user.props.firstName.value,
    last_name: user.props.lastName.value,
    salt: user.props.salt,
    hash: user.props.hash
  };
}
