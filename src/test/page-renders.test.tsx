import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import VisionMission from "@/pages/VisionMission";

const renderInRouter = (page: ReactElement) => {
  return render(<MemoryRouter>{page}</MemoryRouter>);
};

describe("page smoke tests", () => {
  it("renders the home page content", () => {
    renderInRouter(<Index />);

    expect(screen.getByRole("heading", { level: 1, name: /Building the Future of Technology Innovation/i })).toBeInTheDocument();
  });

  it("renders the contact page without crashing", () => {
    renderInRouter(<Contact />);

    expect(screen.getByRole("heading", { name: /Get In Touch/i })).toBeInTheDocument();
  });

  it("renders the services page without crashing", () => {
    renderInRouter(<Services />);

    expect(screen.getByRole("heading", { name: /Our Services/i })).toBeInTheDocument();
  });

  it("renders the vision and mission page without crashing", () => {
    renderInRouter(<VisionMission />);

    expect(screen.getByRole("heading", { name: /Our Vision/i })).toBeInTheDocument();
  });
});

