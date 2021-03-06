import {screen} from "@testing-library/react";
import {render} from "../Utils";
import Map from "../Components/Map";
import "jest-canvas-mock";
import {ChildrenModel} from "../Utils/Models";


jest.mock("@react-google-maps/api", () => ({
    useJsApiLoader: () => ({
        isLoaded: true,
        loadError: null,
    }),
    GoogleMap: () => <div></div>,
    Autocomplete: ({children}: ChildrenModel) => <div>{children}</div>,
}));

test("render map", () => {
    render(<Map/>);

    expect(screen.getByText('Cost per km (PLN)', {selector: 'p'})).toBeInTheDocument()
    expect(screen.getByText(/destination/i)).toBeInTheDocument();
    expect(screen.getByText(/distance/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /save results as pdf/i})).toBeInTheDocument()
});
