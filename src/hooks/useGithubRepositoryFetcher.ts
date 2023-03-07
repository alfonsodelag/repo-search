import { useEffect, useState, useCallback } from "react";
import { Repository } from "../types";

interface Result {
  repositories: Repository[];
  loading: boolean;
  error: Error | null;
  revalidate: () => void;
  hasNextPage: boolean;
}

export const useGithubRepositoryFetcher = (
  query: string,
  page: number
): Result => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const GITHUB_API_URL = `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`;

  const fetchRepositories = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(GITHUB_API_URL);
      const data = await response.json();
      setRepositories(data.items);
      setHasNextPage(data.items.length > 0);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, [GITHUB_API_URL]);

  useEffect(() => {
    if (query) {
      fetchRepositories();
    }
  }, [query, fetchRepositories]);

  const revalidate = useCallback(() => {
    if (query) {
      fetchRepositories();
    }
  }, [query, fetchRepositories]);

  return { repositories, loading, error, revalidate, hasNextPage };
};
