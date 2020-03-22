import DomainEventBus, {
  DomainEvent,
  DomainEventHandler
} from "core/DomainEventBus";
import EntityIdentifier from "./EntityIdentifier";

class TestEvent extends DomainEvent {}

beforeEach(() => {
  DomainEventBus.clearHandlers();
});

test("handlers receive events after being added", () => {
  const handler1: DomainEventHandler<TestEvent> = jest.fn();
  const handler2: DomainEventHandler<TestEvent> = jest.fn();
  const event = new TestEvent(new EntityIdentifier());
  DomainEventBus.addHandler("TestEvent", handler1);
  DomainEventBus.addHandler("TestEvent", handler2);
  DomainEventBus.addHandler("TestEvent", handler1);
  DomainEventBus.dispatch(event);
  expect(handler1).toHaveBeenCalledWith(event);
  expect(handler1).toHaveBeenCalledTimes(2);
  expect(handler2).toHaveBeenCalledWith(event);
  expect(handler2).toHaveBeenCalledTimes(1);
});

test("handler does not receive events after being removed", () => {
  const handler1: DomainEventHandler<TestEvent> = jest.fn();
  const handler2: DomainEventHandler<TestEvent> = jest.fn();
  const event = new TestEvent(new EntityIdentifier());
  DomainEventBus.addHandler("TestEvent", handler1);
  DomainEventBus.addHandler("TestEvent", handler2);
  DomainEventBus.removeHandler("TestEvent", handler1);
  DomainEventBus.dispatch(event);
  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).toHaveBeenCalledWith(event);
  expect(handler2).toHaveBeenCalledTimes(1);
});
