import axios from "axios";

function deleteButton() {
  const deleteBook = async (book_path, onSuccess) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await axios.delete(`${backendUrl}/delete_book`, {
        params: { path: book_path },
      });
      console.log('Book deleted:', response.data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  return deleteBook;
}

export default deleteButton;
