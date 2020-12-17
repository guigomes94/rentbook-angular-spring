import { Author } from "./author.model";

export class Book {
  id: number;
  title: string;
  author: Author;
  available: Boolean;
}
