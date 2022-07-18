import { nanoid } from 'nanoid';
import bookshelf from './bookshelf.js';

const addBookshelf = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookshelf = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (request.payload.name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  bookshelf.push(newBookshelf);

  const checkArr = bookshelf.filter((e) => e.id === id).length > 0;

  if (checkArr) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookshelf = (request, h) => {
  if (bookshelf.length <= 0) {
    return {
      status: 'success',
      data: {
        books: [],
      },
    };
  } else {
    const { reading, finished, name } = request.query;
    if (reading === '1') {
      const readStatus = bookshelf.filter((e) => e.reading === true);
      const response = h.response({
        status: 'success',
        data: {
          books: readStatus.map((e) => ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          })),
        },
      });

      response.code(200);
      return response;
    } else if (reading === '0') {
      const readStatus = bookshelf.filter((e) => e.reading === false);

      if (reading === '') {
        const bookshelfData = bookshelf.map((e) => ({
          id: e.id,
          name: e.name,
          publisher: e.publisher,
        }));
        return {
          status: 'success',
          data: {
            books: bookshelfData,
          },
        };
      }

      const response = h.response({
        status: 'success',
        data: {
          books: readStatus.map((e) => ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          })),
        },
      });

      response.code(200);
      return response;
    }
    if (finished === '1') {
      const finishedStatus = bookshelf.filter((e) => e.finished === true);
      const response = h.response({
        status: 'success',
        data: {
          books: finishedStatus.map((e) => ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          })),
        },
      });

      response.code(200);
      return response;
    } else if (finished === '0') {
      const finishedStatus = bookshelf.filter((e) => e.finished === false);

      if (finished === '') {
        const bookshelfData = bookshelf.map((e) => ({
          id: e.id,
          name: e.name,
          publisher: e.publisher,
        }));
        return {
          status: 'success',
          data: {
            books: bookshelfData,
          },
        };
      }

      const response = h.response({
        status: 'success',
        data: {
          books: finishedStatus.map((e) => ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          })),
        },
      });

      response.code(200);
      return response;
    }
    if (name || name / name === 1) {
      const lowerName = `${name.toLowerCase()}`;
      const dicodingName = bookshelf.filter((e) => e.name.toLowerCase().includes(lowerName));
      if (lowerName !== 'dicoding') {
        const response = h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;
      }

      const response = h.response({
        status: 'success',
        data: {
          books: dicodingName.map((e) => ({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    } else if (name === '') {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });

      response.code(404);
      return response;
    }

    const bookshelfData = bookshelf.map((e) => ({
      id: e.id,
      name: e.name,
      publisher: e.publisher,
    }));

    return {
      status: 'success',
      data: {
        books: bookshelfData,
      },
    };
  }
};

const getBookDetailsById = (request, h) => {
  const { id } = request.params;

  const book = bookshelf.filter((e) => e.id === id)[0];

  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book: { ...book },
    },
  });

  response.code(200);
  return response;
};

const updateBookDataById = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const indexBook = bookshelf.findIndex((e) => e.id === id);

  if (indexBook !== -1) {
    if (request.payload.name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    bookshelf[indexBook] = {
      ...bookshelf[indexBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const indexBook = bookshelf.findIndex((e) => e.id === id);

  if (indexBook !== -1) {
    bookshelf.splice(indexBook, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

export {
  addBookshelf,
  getAllBookshelf,
  getBookDetailsById,
  updateBookDataById,
  deleteBookById,
};
