import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../components/login/login"
import React from "react"


configure({ adapter: new Adapter() });

it("renders Account header", () => {
    const wrapper = shallow(<Login />);
    const welcome = <h2>Welcome Back</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});

// it("renders correctly snapshot", () => {
//   const tree = shallow(<Login />);
//   expect(toJson(tree)).toMatchSnapshot();
// });
