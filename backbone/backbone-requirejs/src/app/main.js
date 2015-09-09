define(['app/models/bookModel'], function (BookModel) {
	var book = new BookModel();
	console.log(book.get('title'));
});