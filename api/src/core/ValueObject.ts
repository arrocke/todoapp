import shallowEqual from "utils/shallow-equal";

export default abstract class ValueObject<T extends {}> {
  public readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

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
