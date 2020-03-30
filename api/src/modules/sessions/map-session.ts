import { DbSession } from "modules/sessions/SessionRepo";
import Session from "modules/sessions/Session";
import { EntityIdentifier } from "core";

export function toEntity(dbSession: DbSession): Session {
  return Session.create(
    {
      userId: new EntityIdentifier(dbSession.user_id)
    },
    new EntityIdentifier(dbSession.id)
  ).value;
}

export function toDb(user: Session): DbSession {
  return {
    id: user.id.toValue(),
    user_id: user.props.userId.toValue()
  };
}
