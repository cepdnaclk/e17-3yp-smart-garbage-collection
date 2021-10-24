// import React from 'react';
// import { act, render, fireEvent, screen } from "@testing-library/react";
// import Signup from "./Signup";
// import user from '@testing-library/user-event';

// describe("Sign Up Functionality", () => {
//     it("Component render", () => {
//         // check if fnameInput rendered
//         const { getByTestId } = render(<Signup />);
//         const fnameInput = getByTestId("fnameInput");
//         expect(fnameInput).toBeTruthy();
//     });
//     it("Required fields error message", () => {
//         // check if lnameInput rendered
//         const { getByTestId } = render(<Signup />);
//         const lnameInput = getByTestId("lnameInput");
//         expect(lnameInput).toBeTruthy();
//     });
//     it("Username max length must be 20", () => {
//         // check if usernameInput rendered
//         const { getByTestId } = render(<Signup />);
//         const usernameInput = getByTestId("usernameInput");
//         expect(usernameInput).toBeTruthy();
//     });
//     it("Password min length must be 5", () => {
//         // check if passwordInput rendered
//         const { getByTestId } = render(<Signup />);
//         const passwordInput = getByTestId("passwordInput");
//         expect(passwordInput).toBeTruthy();
//     });
//     it("Succesfull sign up", () => {
//         // check if button rendered
//         const { getByTestId } = render(<Signup />);
//         const signUpButton = getByTestId("signUpButton");
//         expect(signUpButton).toBeTruthy();
//     });

// })

// import React from 'react';
// import { render, fireEvent } from "@testing-library/react";
// import Signup from "./Signup";
// import Validate from "../Validations/SignupValidation";

// const historyMock = { push: jest.fn() };

// describe("Sign Up Functionality", () => {

//     it("Component render", () => {
//         const component = render(<Signup />);
//     });

//     it("Required fields error message", () => {
//         const { getByTestId } = render(<Signup />);
//         const fnameInput = getByTestId("fnameInput");
//         const lnameInput = getByTestId("lnameInput");
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signUpButton = getByTestId("signUpButton");
//         expect(fnameInput.value).toMatch("");
//         expect(lnameInput.value).toMatch("");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.click(signUpButton);
//         const errorFname = getByText("First name is required");
//         const errorUsername = getByText("Username is required");
//         const errorPassword = getByText("Password is required");
//         expect(errorFname).toBeInTheDocument();
//         expect(errorUsername).toBeInTheDocument();
//         expect(errorPassword).toBeInTheDocument();
//     });

//     it("Username max length must be 20", () => {
//         const { getByTestId } = render(<Signup />);
//         const fnameInput = getByTestId("fnameInput");
//         const lnameInput = getByTestId("lnameInput");
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signUpButton = getByTestId("signUpButton");
//         expect(fnameInput.value).toMatch("");
//         expect(lnameInput.value).toMatch("");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.change(fnameInput, { target: { value: "Kumara" } });
//         fireEvent.change(lnameInput, { target: { value: "Silva" } });
//         fireEvent.change(usernameInput, { target: { value: "kkkkkkkkkkkkkkkkkkkkk" } });
//         fireEvent.change(passwordInput, { target: { value: "kumara123" } });
//         fireEvent.click(signUpButton);
//         const errorUsername = getByText("Must be 20 characters or less");
//         expect(errorUsername).toBeInTheDocument();

//     });

//     it("Password min length must be 5", () => {
//         const { getByTestId } = render(<Signup />);
//         const fnameInput = getByTestId("fnameInput");
//         const lnameInput = getByTestId("lnameInput");
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signUpButton = getByTestId("signUpButton");
//         expect(fnameInput.value).toMatch("");
//         expect(lnameInput.value).toMatch("");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.change(fnameInput, { target: { value: "Kumara" } });
//         fireEvent.change(lnameInput, { target: { value: "Silva" } });
//         fireEvent.change(usernameInput, { target: { value: "kumaraS" } });
//         fireEvent.change(passwordInput, { target: { value: "km" } });
//         fireEvent.click(signUpButton);
//         const errorPassword = getByText("Must be 5 characters or more");
//         expect(errorPassword).toBeInTheDocument();

//     });

//     it("Succesfull sign up", () => {
//         const { getByTestId } = render(<Signup history={historyMock} />);
//         const fnameInput = getByTestId("fnameInput");
//         const lnameInput = getByTestId("lnameInput");
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signUpButton = getByTestId("signUpButton");
//         expect(fnameInput.value).toMatch("");
//         expect(lnameInput.value).toMatch("");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.change(fnameInput, { target: { value: "Kumara" } });
//         fireEvent.change(lnameInput, { target: { value: "Silva" } });
//         fireEvent.change(usernameInput, { target: { value: "kumaraS" } });
//         fireEvent.change(passwordInput, { target: { value: "kumara123" } });
//         fireEvent.click(signUpButton);


//     });
// })





