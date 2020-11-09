import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dash from "../components/dashboard/dashboard"
import React from "react"

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    shallow(<Dash />);
});