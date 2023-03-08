import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

jest.mock("../utils/fetchWithSearchValue");
jest.mock("../constants", () => ({
  PER_PAGE: 1,
}));
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// const mockRouter: NextRouter = {
//   basePath: "",
//   pathname: "/",
//   route: "/",
//   asPath: "/",
//   locale: "en-US",
//   locales: [],
//   defaultLocale: "en-US",
//   isLocaleDomain: false,
//   isReady: true,
//   isPreview: false,
//   query: {},
//   push: jest.fn(),
//   replace: jest.fn(),
//   reload: jest.fn(),
//   back: jest.fn(),
//   prefetch: jest.fn(),
//   beforePopState: jest.fn(),
//   events: {
//     on: jest.fn(),
//     off: jest.fn(),
//     emit: jest.fn(),
//   },
//   isFallback: false,
//   domainLocales: [],
// };

// window.scrollTo = jest.fn();

// const repository: Repository = {
//   id: 1,
//   name: "test",
//   full_name: "test/test",
//   html_url: "https://github.com/",
//   description: "test description",
//   created_at: Date.now().toString(),
//   updated_at: Date.now().toString(),
//   stargazers_count: 666,
//   language: "TypeScript",
//   owner: {
//     avatar_url: "https://avatars.githubusercontent.com/u/50188264?v=4",
//   },
//   license: { name: "MIT" },
//   forks: 666,
// };

// const repository2: Repository = {
//   id: 2,
//   name: "test2",
//   full_name: "test/test2",
//   html_url: "https://github.com/",
//   description: "test2 description",
//   created_at: Date.now().toString(),
//   updated_at: Date.now().toString(),
//   stargazers_count: 666,
//   language: "TypeScript",
//   owner: {
//     avatar_url: "https://avatars.githubusercontent.com/u/50188264?v=4",
//   },
//   license: { name: "MIT" },
//   forks: 666,
// };

describe("Home", () => {
  it("renders search prompt text", () => {
    render(<Home persistData={null} persistQueryValue={null} />);
    const searchPromptText = screen.getByText(
      'Try to type "react" here to start your first search!'
    );
    expect(searchPromptText).toBeInTheDocument();
  });
});

// it("should render empty state correctly", async () => {
//   const searchText = "notfound";

//   render(
//     <RouterContext.Provider value={{ ...mockRouter, query: { q: searchText } }}>
//       <SWRConfig value={{ dedupingInterval: 0 }}>
//         <Home persistData={null} persistQueryValue={searchText} />
//       </SWRConfig>
//     </RouterContext.Provider>
//   );

//   const emptyText = await screen.findByText(
//     `Sorry, we couldn’t find any repositories match "${searchText}" :(`
//   );

//   expect(emptyText).toBeInTheDocument();
// });

// describe("with persist data", () => {
//   it("should render repository correctly", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider
//         value={{ ...mockRouter, query: { q: searchText } }}
//       >
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home
//             persistData={{
//               items: [repository],
//               total_count: 1,
//             }}
//             persistQueryValue={searchText}
//           />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     mockAllIsIntersecting(false);

//     const repositoryEl = await screen.findByText("test/test");

//     expect(repositoryEl).toBeInTheDocument();
//   });

//   it("should render all repository correctly when loadMore has been triggered", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider
//         value={{ ...mockRouter, query: { q: searchText } }}
//       >
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home
//             persistData={{
//               items: [repository],
//               total_count: 2,
//             }}
//             persistQueryValue={searchText}
//           />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     mockAllIsIntersecting(false);
//     const repositoryEl = await screen.findByText("test/test");
//     mockAllIsIntersecting(true);
//     const repository2El = await screen.findByText("test/test2");

//     expect(repositoryEl).toBeInTheDocument();
//     expect(repository2El).toBeInTheDocument();
//   });

//   it("should clear search result when input is empty", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider
//         value={{ ...mockRouter, query: { q: searchText } }}
//       >
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home
//             persistData={{
//               items: [repository],
//               total_count: 2,
//             }}
//             persistQueryValue={searchText}
//           />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     mockAllIsIntersecting(false);
//     const repositoryEl = await screen.findByText("test/test");

//     expect(repositoryEl).toBeInTheDocument();

//     const input = screen.getByPlaceholderText("Search Repository...");

//     userEvent.type(input, "{selectall}{del}");

//     await waitForElementToBeRemoved(repositoryEl);

//     expect(repositoryEl).not.toBeInTheDocument();
//   });
// });

// describe("without persist data", () => {
//   it("should render repository correctly when input changed", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider value={mockRouter}>
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home persistData={null} persistQueryValue={null} />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     const input = screen.getByPlaceholderText("Search Repository...");

//     userEvent.type(input, searchText);

//     mockAllIsIntersecting(false);
//     const repositoryEl = await screen.findByText("test/test");

//     expect(repositoryEl).toBeInTheDocument();
//   });

//   it("should render all repository correctly when loadMore has been triggered", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider value={mockRouter}>
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home persistData={null} persistQueryValue={null} />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     const input = screen.getByPlaceholderText("Search Repository...");
//     userEvent.type(input, searchText);

//     mockAllIsIntersecting(false);
//     const repositoryEl = await screen.findByText("test/test");

//     mockAllIsIntersecting(true);
//     const repository2El = await screen.findByText("test/test");

//     expect(repositoryEl).toBeInTheDocument();
//     expect(repository2El).toBeInTheDocument();
//   });

//   it("should clear search result when input is empty", async () => {
//     const searchText = "test";

//     render(
//       <RouterContext.Provider value={mockRouter}>
//         <SWRConfig value={{ dedupingInterval: 0 }}>
//           <Home persistData={null} persistQueryValue={null} />
//         </SWRConfig>
//       </RouterContext.Provider>
//     );

//     const input = screen.getByPlaceholderText("Search Repository...");
//     userEvent.type(input, searchText);

//     mockAllIsIntersecting(false);
//     const repositoryEl = await screen.findByText("test/test");

//     expect(repositoryEl).toBeInTheDocument();

//     userEvent.type(input, "{selectall}{del}");

//     await waitForElementToBeRemoved(repositoryEl);

//     expect(repositoryEl).not.toBeInTheDocument();
//   });
// });

// it("should render retry button when the API rate limited", async () => {
//   const searchText = "test";

//   render(
//     <RouterContext.Provider value={mockRouter}>
//       <SWRConfig value={{ dedupingInterval: 0 }}>
//         <Home persistData={null} persistQueryValue={null} />
//       </SWRConfig>
//     </RouterContext.Provider>
//   );

//   mockAllIsIntersecting(false);

//   const input = screen.getByPlaceholderText("Search Repository...");
//   userEvent.type(input, searchText);

//   const rateLimit = await screen.findByText(
//     "API rate limit exceeded :( Click here to try again."
//   );
//   expect(rateLimit).toBeInTheDocument();

//   userEvent.click(rateLimit);

//   expect(rateLimit).toBeDisabled();

//   const repositoryEl = await screen.findByText("test/test");
//   expect(repositoryEl).toBeInTheDocument();
//   expect(rateLimit).not.toBeInTheDocument();
// });
