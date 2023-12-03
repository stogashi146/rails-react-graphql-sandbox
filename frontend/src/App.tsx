import { useQuery, gql } from "@apollo/client";
import {
  useBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "./gql/graphql";
import { useState } from "react";

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");
  const [deleteBook] = useDeleteBookMutation({ refetchQueries: ["books"] });
  const [updateBook] = useUpdateBookMutation();

  return (
    <div style={{ width: "400px", margin: " 40px auto" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <h1>書籍一覧</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
        <button
          onClick={() => {
            createBook({ variables: { params: { title: title } } });
            setTitle("");
          }}
        >
          保存
        </button>
      </div>
      {books.map((book) => (
        <div
          key={book.id}
          style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
        >
          <input
            value={book.title || ""}
            onChange={(e) =>
              updateBook({
                variables: { id: book.id, params: { title: e.target.value } },
              })
            }
          />
          <div>{book.title}</div>
          <button onClick={() => deleteBook({ variables: { id: book.id } })}>
            削除
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
