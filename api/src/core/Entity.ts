import EntityIdentifier from "core/EntityIdentifier";

/** Base class for creating entities. */
export default abstract class Entity<T> {
  /** The unique identifier of the entity. */
  protected readonly _id: EntityIdentifier;

  /**
   * The data of the Entity.
   * This is reserved for use by mappers
   * and should not be used within the domain.
   */
  public readonly props: T;

  /**
   * Creates a new Entity with data an an optional identifier.
   * If no identifier is given, one will be generated randomly.
   * This should be called from a derived classes static create method.
   * @param props The data to create the ValueObject with.
   */
  protected constructor(props: T, id?: EntityIdentifier) {
    this._id = id ? id : new EntityIdentifier();
    this.props = props;
  }

  /**
   * Determines if two entities are equal by comparing their identifiers.
   * @param object The other entity to compare.
   */
  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  private static isEntity(v: any): v is Entity<any> {
    return v instanceof Entity;
  }
}
