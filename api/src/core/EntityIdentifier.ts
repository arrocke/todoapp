import { v1 as uuid } from "uuid";
import Identifier from "core/Identifier";

/** Unique identifier for entities. */
export default class EntityIdentifier extends Identifier<string> {
  /**
   * Creates a EntityIdentifier with the given value or a random value if no value is given.
   * @param id The identifier value to initialize with.
   */
  constructor(id?: string) {
    super(id ? id : uuid());
  }
}
