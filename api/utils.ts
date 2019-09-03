import { Types, Document } from "mongoose";

// Quickly convert an ObjectId to its Document type after populating.
export function asDocument<T extends Document>(doc: Types.ObjectId): T {
  return (doc as unknown) as T;
}

// Quickly convert a list of ObjectIds to their Document type after populating.
export function asDocuments<T extends Document>(docs: Types.ObjectId[]): T[] {
  return (docs as unknown) as T[];
}
