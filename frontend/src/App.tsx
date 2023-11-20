import { useQuery, gql } from "@apollo/client";
import { useBooksQuery } from "./gql/graphql";

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}

export default App;
