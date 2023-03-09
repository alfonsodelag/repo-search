import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { useRouter } from "next/router";
import * as nextRouter from "next/router";
import userEvent from "@testing-library/user-event";
import { NextRouter } from "next/router";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { SWRConfig } from "swr";

import { mockRouter } from "./mockRouter";
import Home from "../pages/index";
import { Repository } from "../types";
import { EmptyState } from "../components/EmptyState";
import RepositoryCard from "../components/RepositoryList/RepositoryCard";
import { Header } from "@/components/Layout";
import { SearchBar } from "../components/SearchBar";

jest.mock("../constants", () => ({
  PER_PAGE: 1,
}));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
jest.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
window.scrollTo = jest.fn();
jest.mock("node-fetch", () => {
  return jest.fn();
});

const repository: Repository = {
  id: 1,
  name: "test",
  full_name: "test/test",
  html_url: "https://github.com/",
  description: "test description",
  created_at: Date.now().toString(),
  updated_at: Date.now().toString(),
  stargazers_count: 666,
  language: "TypeScript",
  license: { name: "MIT" },
  forks: 666,
  owner: { avatar_url: "https://avatars.githubusercontent.com/u/20653643?v=4" },
};

const repository2: Repository = {
  id: 2,
  name: "test2",
  full_name: "test/test2",
  html_url: "https://github.com/",
  description: "test2 description",
  created_at: Date.now().toString(),
  updated_at: Date.now().toString(),
  stargazers_count: 666,
  language: "TypeScript",
  license: { name: "MIT" },
  forks: 666,
  owner: { avatar_url: "https://avatars.githubusercontent.com/u/20653643?v=4" },
};

describe("Home", () => {
  it("should render initialize state correctly", () => {
    render(<Home persistData={null} persistQueryValue={null} />);

    expect(
      screen.getByText('Try to type "react" here to start your first search!')
    ).toBeInTheDocument();
  });

  it("should render the Empty state correctly", () => {
    const searchText = "notfound";
    render(<EmptyState searchValue={searchText} />);
    const noMatch = screen.getByTestId(`nomatch-${searchText}`);
    expect(noMatch).toBeInTheDocument();
    expect(noMatch).toHaveTextContent(
      `Sorry, we couldn't find any repositories that match "${searchText}"`
    );
  });

  it("should render repository correctly", async () => {
    render(<RepositoryCard repository={repository} />);

    mockAllIsIntersecting(false);

    const repositoryEl = screen.getByRole("article");
    expect(repositoryEl).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Home persistData={null} persistQueryValue={null} />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });

  it("RepositoryCard renders correctly", () => {
    render(<RepositoryCard repository={repository2} />);
    const repositoryName = screen.getByTestId("repository-name");
    expect(repositoryName).toHaveTextContent(repository.full_name);
  });
});
