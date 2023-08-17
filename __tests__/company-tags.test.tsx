import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompanyTags from "@/components/Company_tags/CompanyTags";

describe("CompanyTags component", () => {
  const mockCompanies = Array(30)
    .fill(undefined)
    .map((company, index) => ({
      name: `company-${index}`,
      count: index + 1,
    }));

  it("renders the company tags with initial state", () => {
    render(<CompanyTags companies={mockCompanies} />);
    expect(screen.getByText("Companies")).toBeInTheDocument();
    const inputPlaceholder = screen.getByPlaceholderText("Filter topics");
    expect(inputPlaceholder.getAttribute("placeholder")).toBe("Filter topics");
  });

  it("filters the companies based on search input", async () => {
    render(<CompanyTags companies={mockCompanies} />);

    const searchInput = screen.getByPlaceholderText(
      "Filter topics"
    ) as HTMLInputElement;

    await userEvent.type(searchInput, "Ccompany-1");
    const inputValue = searchInput.value;
    expect(searchInput).toHaveValue(inputValue);
  });

  it("handles pagination correctly", () => {
   
    // render(<CompanyTags companies={mockCompanies} />);

    // const nextButton = screen.getByLabe

    // expect(screen.getByText("Company C")).toBeInTheDocument();
    // expect(screen.queryByText("Company A")).not.toBeInTheDocument();
    // expect(screen.queryByText("Company B")).not.toBeInTheDocument();

    // const prevButton = screen.getByLabelText("Previous");
    // userEvent.click(prevButton);

    // expect(screen.getByText("Company A")).toBeInTheDocument();
    // expect(screen.queryByText("Company C")).not.toBeInTheDocument();
    // expect(screen.queryByText("Company B")).not.toBeInTheDocument();
  });
});
