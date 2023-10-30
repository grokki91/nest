import { IBook } from '../interfaces/book.interface';

export const books: IBook[] = [
  {
    id: '1',
    title: 'Гарри Поттер',
    description: 'Фэнтези',
    authors: 'Д. Роулинг',
    favorite: false,
    fileCover: '1500',
    fileName: 'hpotter',
    fileBook: 'test',
  },
  {
    id: '2',
    title: 'Властелин колец',
    description: 'Фэнтези',
    authors: 'Д. Толкиен',
    favorite: true,
    fileCover: '2000',
    fileName: 'LoR',
    fileBook: 'test',
  },
];
