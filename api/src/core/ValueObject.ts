import shallowEqual from "utils/shallow-equal";

/** Base class for creating value objects. */
export default abstract class ValueObject<T extends {}> {
  /**
   * The data of the ValueObject.
   * This is reserved for use by mappers
   * and should not be used within the domain.
   */
  public readonly props: T;

  /**
   * Creates a new ValueObject with data and prevents it from being modified.
   * This should be called from a derived classes static create method.
   * @param props The data to create the ValueObject with.
   */
  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  /**
   * Compares another ValueObject by their value.
   * @param vo The other ValueObject to compare.
   */
  public equals(vo?: ValueObject<T>): boolean {
    return (
      vo !== null &&
      vo !== undefined &&
      vo.props !== undefined &&
      vo.props !== null &&
      shallowEqual(this.props, vo.props)
    );
  }
}
