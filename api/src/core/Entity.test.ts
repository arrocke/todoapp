import { v4 as uuid } from "uuid";
import Entity from "core/Entity";
import EntityIdentifier from "core/EntityIdentifier";

class TestEntity extends Entity<string> {
  static create(props: string, id?: EntityIdentifier): TestEntity {
    return new TestEntity(props, id);
  }

  get id(): string {
    return this._id.toValue();
  }
}

test("creates an Entity with given data and identifier", () => {
  const data = "entity-value";
  const id = uuid();
  const entity = TestEntity.create(data, new EntityIdentifier(id));
  expect(entity.id).toEqual(id);
  expect(entity.props).toEqual(data);
});

test("creates an Entity with given data and a random identifier", () => {
  const data = "entity-value";
  const entity = TestEntity.create(data);
  expect(entity.id).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
  expect(entity.props).toEqual(data);
});

test("equals returns false if the given object is null", () => {
  const entity = TestEntity.create("entity-value");
  expect(entity.equals(null)).toEqual(false);
});

test("equals returns false if the given object is undefined", () => {
  const entity = TestEntity.create("entity-value");
  expect(entity.equals(undefined)).toEqual(false);
});

test("equals returns true if the given object is the same as the entity", () => {
  const entity = TestEntity.create("entity-value");
  expect(entity.equals(entity)).toEqual(true);
});

test("equals returns false if the given object is not an entity", () => {
  const entity = TestEntity.create("entity-value");
  expect(entity.equals({} as any)).toEqual(false);
});

test("equals returns false if the given object is an entity with a different identifier", () => {
  const entity = TestEntity.create("entity-value");
  expect(entity.equals(TestEntity.create("another-value"))).toEqual(false);
});

test("equals returns true if the given object is an entity with the same identifier", () => {
  const entity = TestEntity.create("entity-value");
  expect(
    entity.equals(
      TestEntity.create("entity-value", new EntityIdentifier(entity.id))
    )
  ).toEqual(true);
});
