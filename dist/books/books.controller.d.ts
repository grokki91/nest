import { BooksService } from './books.service';
export declare class BooksController {
    private readonly bookService;
    constructor(bookService: BooksService);
    getBooks(): void;
}
