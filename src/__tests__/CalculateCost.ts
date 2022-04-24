import {calculateCost} from "../Utils";

const {distance, costPerKm} = {
    distance: 5000,
    costPerKm: 5,
};

test("calculate correct cost", () => {
    expect(calculateCost({distance, costPerKm})).toEqual(34500);
});
