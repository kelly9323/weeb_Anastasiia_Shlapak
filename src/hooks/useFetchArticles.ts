import { useState, useEffect } from "react";
import { fetchArticles, type Article } from "../api/articlesApi";

interface UseFetchArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetch articles from the API
 */
export const useFetchArticles = (): UseFetchArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(
        "Impossible de charger les articles. Veuillez réessayer plus tard."
      );
      console.error("Error loading articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: loadArticles,
  };
};
