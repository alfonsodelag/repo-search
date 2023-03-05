import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

type Data = {
  name: string;
  email: string;
  phone: string;
}

type Arguments = {
  searchValue?: string;
}

type Key = [number, string | null];

const getKey: (index: number, previousPageData: Data[] | null) => Key = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return [index + 1, 'hello'];
};

const fetcher = async (page: number, searchValue: string): Promise<Data[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`);
  const data = await res.json();
  return data;
};

const useData = (): SWRInfiniteResponse<Data[], Error> => {
  const { data, error, size, setSize } = useSWRInfinite<Data[], Error>(getKey, fetcher);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  const loadMore = () => {
    if (!isLoadingMore) setSize(size + 1);
  };

  return {
    data: data?.flat(),
    error,
    isLoading: isLoadingMore,
    isLoadingInitialData,
    isReachingEnd,
    loadMore,
  };
};
