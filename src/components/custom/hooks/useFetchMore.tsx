import { useCallback, useEffect, useState } from "react";

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface UseFetchMoreProps {
  products: Products[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  fetchMore: () => void;
}

const useFetchMore = (initiaUrl: string, limit: number): UseFetchMoreProps => {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${initiaUrl}?limit=${limit}&skip=${(page - 1) * limit}`);
      const data = await response.json();

      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.products.length === limit);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Faild");
      setLoading(false);
    }
  }, [initiaUrl, limit, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return { products, hasMore, loading, error, fetchMore };
};

export default useFetchMore;
