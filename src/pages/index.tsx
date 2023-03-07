import { NextPage, GetServerSideProps } from "next";
import { ChangeEventHandler, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { GITHUB_SEARCH_REPOSITORY_URL } from "../constants";
import { Header, Main } from "../components/Layout";
import RepositoryList from "../components/RepositoryList/RepositoryList";
import { RevalidateButton } from "../components/RevalidateButton";
import { SearchBar } from "../components/SearchBar";
import { Skeletons } from "../components/Skeletons";
import { useResetScrollTop, useSyncRouteQuery } from "../hooks";
import { Data, Repository } from "../types";
import MetaData from "../components/MetaData/MetaData";
import { EmptyState } from "../components/EmptyState";
import Pagination from "@/components/Pagination/Pagination";

interface HomeProps {
  // eslint-disable-next-line camelcase
  persistData: Data | null;
  persistQueryValue: string | null;
}

const Home: NextPage<HomeProps> = ({ persistData, persistQueryValue }) => {
  const [value, setValue] = useState(persistQueryValue ?? "");
  const [searchValue] = useDebounce(value, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const ITEMS_PER_PAGE = 10; // Change this as per your requirements

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      setError(null);
      setRepositories([]);
      setHasNextPage(false);

      const url = `https://api.github.com/search/repositories?q=${searchValue}&per_page=10&page=${currentPage}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRepositories(data.items);
          setHasNextPage(data.items.length > 0);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchValue, currentPage]);

  const totalPages = Math.ceil(repositories.length / ITEMS_PER_PAGE);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!loading) {
      setValue(event.target.value);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // const handleLoadMore = () => {
  //   if (!loading && !error && hasNextPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // Force reset scroll top after page refresh
  // to prevent trigger loadMore
  useResetScrollTop();
  // Sync the search value to url query params
  useSyncRouteQuery(searchValue);

  return (
    <>
      <MetaData searchValue={searchValue} />
      <Header />
      <Main>
        <SearchBar value={value} onChange={handleInputChange} />
        {repositories.length !== 0 && (
          <RepositoryList
            repositories={repositories}
            // onLoadMore={handleLoadMore}
          />
        )}
        {!loading && !error && searchValue && repositories.length === 0 && (
          <EmptyState searchValue={searchValue} />
        )}
        {loading && <Skeletons />}
        {/* If the API throw error, render a retry button */}
        {hasNextPage && (
          <Pagination
            currentPage={currentPage}
            onNextPage={handleNextPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
          />
        )}
        {loading && <Skeletons />}
      </Main>
    </>
  );
};

export default Home;

// Persist data on SSR if the url contains search value
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const queryValue = (context.query.q ?? null) as string | null;

  let persistData = null;

  if (queryValue) {
    const response = await fetch(
      `${GITHUB_SEARCH_REPOSITORY_URL}&q=${queryValue}`
    );
    const data = (await response.json()) as Data;

    if (data) {
      persistData = data;
    }
  }

  return {
    props: {
      persistQueryValue: queryValue,
      persistData,
    },
  };
};
