import { useEffect } from "react";
import "./App.css";
import useFetchMore from "./components/custom/hooks/useFetchMore";

function App() {
  const { products, hasMore, loading, error, fetchMore } = useFetchMore("https://dummyjson.com/products", 10);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      hasMore
    ) {
      fetchMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <div>
      {products.map((i) => (
        <div key={i.id} style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
          <h3>{i.title}</h3>
          <p>{i.description}</p>
          <h6>{i.price}</h6>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error {error}</p>}
    </div>
  );
}

export default App;
