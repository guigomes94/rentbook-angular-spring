import { Book } from "./book.model";
import { User } from "./user.model";

export class Reservation {
  id: number;
  user: User;
  book: Book;
  rentDate: Date;
}
