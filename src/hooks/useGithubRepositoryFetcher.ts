import useSWRInfinite from 'swr/infinite';
import uniqBy from 'lodash.uniqby';

import { PER_PAGE } from '../constants';
import { Data, Repository } from '../types';

import { useHasMounted } from './useHasMounted';
import { fetchWithSearchValue } from '../utils/fetchWithSearchValue';

const useGithubRepositoryFetcher = (
  searchValue: string,
  persistData: Data | null
): {
  repositories: Repository[];
  loading: boolean;
  loadMore: () => void;
  error: Error;
  revalidate: () => void;
} => {
  const hasMounted = useHasMounted();
  
  console.log("searchVaLUE FROM", searchValue);

  const {
    data,
    error,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<Data>(
    (index, previousPageData) => {
      if (!searchValue) {
        return null;
      }

      if (previousPageData && !previousPageData.items) {
        return null;
      }

      return [index + 1, searchValue];
    },
    fetchWithSearchValue(searchValue),
    // ! options
  );

  // reduce the data items
  const repositories =
    data?.reduce<Repository[]>(
      (acc, curr) => ('items' in curr ? [...acc, ...curr.items] : acc),
      []
    ) ?? [];

  const loading = Boolean(
    !error &&
      searchValue &&
      (!data ||
        (size > 0 &&
          typeof data !== 'undefined' &&
          typeof data[size - 1] === 'undefined'))
  );

  const loadMore = () => {
    if (data && data[size - 1].total_count > size * PER_PAGE) {
      setSize((prev) => prev + 1);
    }
  };

  return {
    // The github api sometimes returns duplicate data on different pages
    repositories: uniqBy(repositories, 'id'),
    loading,
    error,
    loadMore,
    revalidate: mutate,
  };
};

export { useGithubRepositoryFetcher };
