import { useQuery } from "@apollo/client";

import { GET_CARTOONS } from "./schemas/cartoon.schema";
import { getAllCartoonType } from "./types/cartoon.type";

function App() {
  const { data, loading, error } = useQuery(GET_CARTOONS);

  return (
    <>
      <h1>Hello World</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Oh no, an error occurred</p>}
      {data && data.getCartoons.map((cartoon: getAllCartoonType) => (
        <div key={cartoon.id}>
          <h2>{cartoon.name}</h2>
          <p>{cartoon.description}</p>
        </div>
      ))}
    </>
  )
}

export default App
