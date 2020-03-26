import crypto from "crypto";
import { AggregateRoot, EntityIdentifier, Result, validate } from "core";
import UserCreatedEvent from "./events";

const SALT_LEN = 16;

/**
 * Generates a random salt of a given length.
 * @param length The length of the salt to generate.
 */
function generateSalt(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

/**
 * Generates a sha512 hash from a salt and password.
 * @param salt The salt to use in the hash.
 * @param password The password to use in the hash.
 */
function sha512(salt: string, password: string): string {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
}

/** Data for the User entity. */
export interface UserProps {
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  hash: string;
}

/** Data for creating a new User entity. */
export type RegisterUserProps = Omit<UserProps, "salt" | "hash">;

/** A user who can log in to the app. */
export default class User extends AggregateRoot<UserProps> {
  /** The email address of the user. */
  get email(): string {
    return this.props.email;
  }

  /** The first name of the user. */
  get firstName(): string {
    return this.props.firstName;
  }

  /** The last name of the user. */
  get lastName(): string {
    return this.props.lastName;
  }

  /**
   * Creates an existing user with their identifier.
   * @param props Data to initialize the user with.
   * @param id The entity identifier of the user.
   */
  static create(props: UserProps, id: EntityIdentifier): Result<User> {
    const { email, firstName, lastName, salt, hash } = props;
    const validateResult = validate(
      {
        value: email,
        name: "email",
        notUndefined: true,
        notNull: true
      },
      {
        value: firstName,
        name: "firstName",
        notUndefined: true,
        notNull: true
      },
      {
        value: lastName,
        name: "lastName",
        notUndefined: true,
        notNull: true
      },
      {
        value: salt,
        name: "salt",
        notUndefined: true,
        notNull: true
      },
      {
        value: hash,
        name: "hash",
        notUndefined: true,
        notNull: true
      }
    );

    if (validateResult.isFailure) {
      return Result.fail<User>(validateResult.error);
    } else {
      return Result.ok(
        new User({ email, firstName, lastName, salt, hash }, id)
      );
    }
  }

  /**
   * Creates an new user with a password.
   * @param props Data to initialize the new user with.
   * @param password The password of the new user.
   */
  static register(props: RegisterUserProps, password: string): Result<User> {
    const { email, firstName, lastName } = props;
    const validateResult = validate(
      {
        value: email,
        name: "email",
        notUndefined: true,
        notNull: true
      },
      {
        value: firstName,
        name: "firstName",
        notUndefined: true,
        notNull: true
      },
      {
        value: lastName,
        name: "lastName",
        notUndefined: true,
        notNull: true
      },
      {
        value: password,
        name: "password",
        notUndefined: true,
        notNull: true
      }
    );

    if (validateResult.isFailure) {
      return Result.fail<User>(validateResult.error);
    } else {
      const salt = generateSalt(SALT_LEN);
      const hash = sha512(salt, password);

      const user = new User({ email, firstName, lastName, salt, hash });
      user.addEvent(new UserCreatedEvent(user.id));

      return Result.ok(user);
    }
  }

  /**
   * Validates that a password matches the user's password.
   * @param password The password to validate.
   */
  validatePassword(password: string): Result {
    const validateResult = validate({
      value: password,
      name: "password",
      notUndefined: true,
      notNull: true
    });

    if (validateResult.isFailure) {
      return Result.fail(validateResult.error);
    } else {
      const hash = sha512(this.props.salt, password);
      if (hash === this.props.hash) {
        return Result.ok();
      } else {
        return Result.fail("Password is incorrect.");
      }
    }
  }

  /**
   * Changes the password for the user.
   * @param password The new password to set.
   */
  changePassword(password: string): Result {
    const validateResult = validate({
      value: password,
      name: "password",
      notUndefined: true,
      notNull: true
    });

    if (validateResult.isFailure) {
      return Result.fail(validateResult.error);
    } else {
      this.props.salt = generateSalt(SALT_LEN);
      this.props.hash = sha512(this.props.salt, password);

      return Result.ok();
    }
  }

  /**
   * Updates the name of the user.
   * @param firstName The new first name to set.
   * @param lastName The new last name to set.
   */
  updateName(firstName: string, lastName: string): Result {
    const validateResult = validate(
      {
        value: firstName,
        name: "firstName",
        notUndefined: true,
        notNull: true
      },
      {
        value: lastName,
        name: "lastName",
        notUndefined: true,
        notNull: true
      }
    );
    if (validateResult.isFailure) {
      return Result.fail(validateResult.error);
    } else {
      this.props.firstName = firstName;
      this.props.lastName = lastName;
      return Result.ok();
    }
  }

  /**
   * Updates the email address of the user.
   * @param email The new email address to set.
   */
  updateEmail(email: string): Result {
    const validateResult = validate({
      value: email,
      name: "email",
      notUndefined: true,
      notNull: true
    });
    if (validateResult.isFailure) {
      return Result.fail(validateResult.error);
    } else {
      this.props.email = email;
      return Result.ok();
    }
  }
}
