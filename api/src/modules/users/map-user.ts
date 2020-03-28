import { DbUser } from "modules/users/UserRepo";
import User from "modules/users/User";
import { EntityIdentifier } from "core";
import UserEmail from "./UserEmail";

export function toEntity(dbUser: DbUser): User {
  return User.create(
    {
      email: UserEmail.create(dbUser.email).value,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
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
    first_name: user.props.firstName,
    last_name: user.props.lastName,
    salt: user.props.salt,
    hash: user.props.hash
  };
}
