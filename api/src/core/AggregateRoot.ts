import Entity from "core/Entity";
import EntityIdentifier from "core/EntityIdentifier";
import DomainEventBus, { DomainEvent } from "core/DomainEventBus";

/** Base class for creating aggregate roots. */
export default abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: DomainEvent[] = [];

  /** The identifier for the aggregate root. */
  get id(): EntityIdentifier {
    return this._id;
  }

  /**
   * Adds an event to be dispatched later.
   * @param event The domain event to dispatch.
   */
  protected addEvent<T extends DomainEvent>(event: T): void {
    this.domainEvents.push(event);
  }

  /** Dispatches all events on the aggregate to their listeners. */
  dispatchEvents(): void {
    this.domainEvents.forEach(event => DomainEventBus.dispatch(event));
    this.clearEvents();
  }

  /** Clears all events on the aggregate. */
  clearEvents(): void {
    this.domainEvents = [];
  }
}
