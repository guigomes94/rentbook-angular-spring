import { Book } from "./book.model";
import { User } from "./user.model";

export class Rent {
  id: number;
  user: User;
  book: Book;
  rentDate: string;
  devolutionDate: string;
  paymentValue: Number;
}
