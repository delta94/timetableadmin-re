import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../app"
import React from "react"

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    shallow(<App />);
});


  