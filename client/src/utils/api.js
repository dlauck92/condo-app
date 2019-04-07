import axios from "axios";

export default {
  // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
  // Saves a work order ticket to the database
  saveWorkOrder: function(newWorkorder) {
    return axios.post("/api/CreateWorkOrder", newWorkorder);
  }
};