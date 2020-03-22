import EntityIdentifier from "core/EntityIdentifier";

/** Base class for domain events. */
export abstract class DomainEvent {
  /** The date and time the event was created. */
  readonly timestamp: Date;
  /** The identifier of the aggregate that dispatched the event. */
  readonly aggregateId: EntityIdentifier;

  /**
   * Creates a new DomainEvent with the aggregate identifier and timestamp.
   * @param aggregateId The identifier of the aggregate that dispatched the event.
   * @param timestamp The date and time the event was created. Defaults to the current time if not specified.
   */
  constructor(aggregateId: EntityIdentifier, timestamp: Date = new Date()) {
    this.timestamp = timestamp;
    this.aggregateId = aggregateId;
  }

  /** The name of the event. */
  get name(): string {
    return this.constructor.name;
  }
}

/** The shape of event handler functions. */
export interface DomainEventHandler<T extends DomainEvent> {
  (event: T): void;
}

/** Singleton class for dispatching domain events to event handlers. */
export default class DomainEventBus {
  private static handlersMap: {
    [event: string]: DomainEventHandler<any>[];
  } = {};

  /**
   * Adds a new event handler to the event handler bus.
   * @param eventName The name of the event to listen to.
   * @param callback The function to call when the event is dispatched.
   */
  static addHandler<T extends DomainEvent>(
    eventName: string,
    callback: DomainEventHandler<T>
  ): void {
    if (!this.handlersMap[eventName]) {
      this.handlersMap[eventName] = [];
    }
    this.handlersMap[eventName].push(callback);
  }

  /**
   * Removes an event handler from the event handler bus.
   * @param eventName The name of the event to remove a handler from.
   * @param callback The function to remove from the event handler bus.
   */
  static removeHandler<T extends DomainEvent>(
    eventName: string,
    callback: DomainEventHandler<T>
  ): void {
    if (!!this.handlersMap[eventName]) {
      this.handlersMap[eventName] = this.handlersMap[eventName].filter(
        handler => handler !== callback
      );
    }
  }

  /** Removes all handlers. For use in unit tests. */
  static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * Dispatches a domain event to all its listeners.
   * @param event The domain event to dispatch.
   */
  static dispatch(event: DomainEvent): void {
    const handlers = this.handlersMap[event.name] || [];
    handlers.forEach(handler => handler(event));
  }
}
