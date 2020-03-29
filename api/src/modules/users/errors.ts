import { EntityIdentifier } from "core";

export class UsersExistsError extends Error {
  constructor(email: string) {
    super(`A user with the email ${email} already exists.`);
    this.name = "UsersExistsError";
  }
}

export class UserNotFoundError extends Error {
  constructor(id: EntityIdentifier) {
    super(`User with id ${id} not found.`);
    this.name = "UserNotFoundError";
  }
}

export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`No user with the email ${email} exists.`);
    this.name = "UserNotFoundError";
  }
}
