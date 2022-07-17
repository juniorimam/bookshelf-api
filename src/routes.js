import {
  addBookshelf,
  deleteBookById,
  getAllBookshelf,
  getBookDetailsById,
  updateBookDataById,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookshelf,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshelf,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookDetailsById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookDataById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

export default routes;
