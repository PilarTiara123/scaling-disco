const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading}= request.payload;
    const id = nanoid(16);

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

if (!name){
   const response=h.response({
    status :'fail',
    message : 'Gagal menambahkan buku,mohon isi nama buku',
   });
response.code (400);
return response;
}
if (readPage < pageCount){
  const response=h.response ({
    status :'fail',
    message :' Gagal menambahkan buku, readpage harus lebih besar dari pagecount',
  });
response.code (400);
return response;
}

let finished = false ;

if (pageCount === readPage) {
  finished = true;
}
const newBooks = {
    name,year,author,summary,publisher,pageCount,readPage,reading,finished,id,insertedAt, updatedAt,
    }

books.push(newBooks);
const isSuccess = books.filter((book) => book.id === id).length > 0;

if (isSuccess) {
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: books[0].id,
    },
  });
  response.code(201);
  //response.header('Access-Control-Allow-Origin', '*');
  return response;
} 
response.code(500);
return response;

};

const getAllBooksHandler = (request,h) => {
  const {name,reading,finished}=request.query 
  if(name){
    const response=h.response({
      status:'success',
      data :{
        book:books.filter((n)=>n.name === name).map((book)=>({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        }))
      }
    })
   response.code(200)
   return response;
  }
  if(reading='1'){
    const response=h.response({
      status:'success',
      data :{
        book:books.filter((r)=>r.reading ===true).map((book)=>({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        }))
      }
    })
   response.code(200)
   return response;
  }
  if(reading='0'){
    const response=h.response({
      status:'success',
      data :{
        book:books.filter((r)=>r.reading ===false).map((book)=>({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        }))
      }
    })
   response.code(200)
   return response;
  }
  if(finished='1'){
    const response=h.response({
      status:'success',
      data :{
        book:books.filter((f)=>f.finished ===true).map((book)=>({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        }))
      }
    })
   response.code(200)
   return response;
  }
  if(finished='0'){
    const response=h.response({
      status:'success',
      data :{
        book:books.filter((f)=>f.finished ===false).map((book)=>({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        }))
      }
    })
   response.code(200)
   return response;
  }
  const response = h.response({
    status: 'success',
    data: {
          books: bookshelf.map((m)=> ({
            id: m.id,
            name: m.name,
            publisher: m.publisher
          }))
    }
    })
    response.code(200);
    return response;
};


//Kriteria 5 
const getBooksByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((n) => n.id === id)[0];
 
 if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
//Kriteria 6
const editBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
 
  const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

  //const insertedAt = new Date().toISOString();
  if(!name){
    const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
    response.code(400);
    return response;
  }
  if(readPage>pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400);
    return response;

  }
  const index = books.findIndex((note) => books.id === id);
  const updatedAt = new Date().toISOString();
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
    
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
 
const deleteBooksByIdHandler = (request, h) => {
  const {bookId} = request.params;
 
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Buku  gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = {addBooksHandler,getAllBooksHandler,getBooksByIdHandler,editBooksByIdHandler,deleteBooksByIdHandler};

