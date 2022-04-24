import {screen} from "@testing-library/react";
import Form from "../Components/Form";
import {render} from "../Utils/";
import userEvent from "@testing-library/user-event";
import {ChildrenModel} from "../Utils/Models";


jest.mock("@react-google-maps/api", () => ({
    useJsApiLoader: () => ({
        isLoaded: true,
        loadError: null,
    }),
    GoogleMap: () => <div></div>,
    Autocomplete: ({children}: ChildrenModel) => <div>{children}</div>,
}));

test("render form", () => {
    render(<Form/>);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(/maps/i);
    expect(screen.getByRole("heading", {level: 2})).toHaveTextContent(
        /select a route below to get the data you are interested in/i
    );
    expect(screen.getByRole("button", {name: /apply/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/input origin/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/input destination/i)).toBeInTheDocument();
});

test("display last trip", async () => {
    render(<Form/>);

    await userEvent.type(
        screen.getByPlaceholderText(/input origin/i),
        "Warszawa"
    );
    await userEvent.type(
        screen.getByPlaceholderText(/input destination/i),
        "Szczecin"
    );
    await userEvent.click(screen.getByRole("button", {name: /apply/i}));

    expect(screen.getByText(/last trip/i)).toBeInTheDocument();
    expect(screen.getByText(/warszawa/i)).toBeInTheDocument();
    expect(screen.getByText(/szczecin/i)).toBeInTheDocument();
});
