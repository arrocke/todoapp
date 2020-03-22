import { v4 as uuid } from "uuid";
import AggregateRoot from "core/AggregateRoot";
import AggregateRootIdentifier from "core/EntityIdentifier";
import DomainEventBus, {
  DomainEvent,
  DomainEventHandler
} from "./DomainEventBus";

class TestEvent extends DomainEvent {}

class TestAggregateRoot extends AggregateRoot<string> {
  static create(
    props: string,
    id?: AggregateRootIdentifier
  ): TestAggregateRoot {
    return new TestAggregateRoot(props, id);
  }

  testAction(): void {
    this.addEvent(new TestEvent(this.id));
  }
}

test("creates an AggregateRoot with given data and identifier", () => {
  const data = "AggregateRoot-value";
  const id = uuid();
  const aggregate = TestAggregateRoot.create(
    data,
    new AggregateRootIdentifier(id)
  );
  expect(aggregate.id.toValue()).toEqual(id);
  expect(aggregate.props).toEqual(data);
});

test("creates an AggregateRoot with given data and a random identifier", () => {
  const data = "AggregateRoot-value";
  const aggregate = TestAggregateRoot.create(data);
  expect(aggregate.id.toValue()).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
  expect(aggregate.props).toEqual(data);
});

test("equals returns false if the given object is null", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(aggregate.equals(null)).toEqual(false);
});

test("equals returns false if the given object is undefined", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(aggregate.equals(undefined)).toEqual(false);
});

test("equals returns true if the given object is the same as the AggregateRoot", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(aggregate.equals(aggregate)).toEqual(true);
});

test("equals returns false if the given object is not an AggregateRoot", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(aggregate.equals({} as any)).toEqual(false);
});

test("equals returns false if the given object is an AggregateRoot with a different identifier", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(aggregate.equals(TestAggregateRoot.create("another-value"))).toEqual(
    false
  );
});

test("equals returns true if the given object is an AggregateRoot with the same identifier", () => {
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  expect(
    aggregate.equals(
      TestAggregateRoot.create("AggregateRoot-value", aggregate.id)
    )
  ).toEqual(true);
});

test("dispatches events that have been added", () => {
  const handler: DomainEventHandler<TestEvent> = jest.fn();
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  DomainEventBus.addHandler("TestEvent", handler);
  aggregate.testAction();
  aggregate.dispatchEvents();
  expect(handler).toHaveBeenCalledTimes(1);
});

test("does not dispatch events after they have been cleared", () => {
  const handler: DomainEventHandler<TestEvent> = jest.fn();
  const aggregate = TestAggregateRoot.create("AggregateRoot-value");
  DomainEventBus.addHandler("TestEvent", handler);
  aggregate.testAction();
  aggregate.clearEvents();
  aggregate.dispatchEvents();
  expect(handler).not.toHaveBeenCalled();
});
