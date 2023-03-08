import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home component", () => {
  it("should render with initial state and show error message if no matching repositories", () => {
    render(<Home persistData={null} persistQueryValue={null} />);

    // Check that the input field is empty
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("");

    // Check that the error message is displayed
    const errorMessage = screen.getByText(
      "Sorry, we couldn’t find any repositories match"
    );
    expect(errorMessage).toBeInTheDocument();

    // Check that the repository list and pagination are not displayed
    const repositoryList = screen.queryByRole("list");
    expect(repositoryList).not.toBeInTheDocument();

    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });
});
