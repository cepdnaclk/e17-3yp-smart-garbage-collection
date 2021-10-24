// import React from 'react';
// import { render, fireEvent } from "@testing-library/react";
// import Signin from "./Signin";
// import Validate from "../Validations/SigninValidation";

// const historyMock = { push: jest.fn() };

// describe("Sign In Functionality", () => {

//     it("Component render", () => {
//         const component = render(<Signin />);
//     });

//     it("Required fields error message", () => {
//         const { getByTestId } = render(<Signin />);
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signInButton = getByTestId("signInButton");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.click(signInButton);
//         const errorUsername = getByText("Username is required");
//         const errorPassword = getByText("Password is required");
//         expect(errorUsername).toBeInTheDocument();
//         expect(errorPassword).toBeInTheDocument();
//     });

//     it("Succesfull sign in", () => {
//         const { getByTestId } = render(<Signin history={historyMock} />);
//         const usernameInput = getByTestId("usernameInput");
//         const passwordInput = getByTestId("passwordInput");
//         const signInButton = getByTestId("signInButton");
//         expect(usernameInput.value).toMatch("");
//         expect(passwordInput.value).toMatch("");
//         fireEvent.change(usernameInput, { target: { value: "kumaraS" } });
//         fireEvent.change(passwordInput, { target: { value: "kumara123" } });
//         fireEvent.click(signInButton);


//     });
// })

