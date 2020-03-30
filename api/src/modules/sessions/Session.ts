import { validate, AggregateRoot, EntityIdentifier, Result } from "core";

/** Data for the Session entity. */
export interface SessionProps {
  userId: EntityIdentifier;
}

/** A session for a user who is logged in to the app. */
export default class Session extends AggregateRoot<SessionProps> {
  /** The identifier for the user associated with this session. */
  get userId(): EntityIdentifier {
    return this.props.userId;
  }

  /**
   * Creates exising and new user sessions.
   * @param props Data to initialize the session with.
   * @param id The entity identifier of the session.
   */
  static create(
    props: SessionProps,
    id: EntityIdentifier = new EntityIdentifier()
  ): Result<Session> {
    const { userId } = props;

    const validateResult = validate({
      value: userId,
      name: "userId",
      notUndefined: true,
      notNull: true
    });
    if (validateResult.isFailure) {
      return Result.fail(validateResult.error);
    }

    return Result.ok(new Session({ userId }, id));
  }
}
