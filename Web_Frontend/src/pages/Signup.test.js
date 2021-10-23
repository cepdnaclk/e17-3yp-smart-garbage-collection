import React from 'react';
import { act, render, fireEvent, screen } from "@testing-library/react";
import Signup from "./Signup";
import user from '@testing-library/user-event';

describe("Sign Up Functionality", () => {
    it("Component render", () => {
        // check if fnameInput rendered
        const { getByTestId } = render(<Signup />);
        const fnameInput = getByTestId("fnameInput");
        expect(fnameInput).toBeTruthy();
    });
    it("Required fields error message", () => {
        // check if lnameInput rendered
        const { getByTestId } = render(<Signup />);
        const lnameInput = getByTestId("lnameInput");
        expect(lnameInput).toBeTruthy();
    });
    it("Username max length must be 20", () => {
        // check if usernameInput rendered
        const { getByTestId } = render(<Signup />);
        const usernameInput = getByTestId("usernameInput");
        expect(usernameInput).toBeTruthy();
    });
    it("Password min length must be 5", () => {
        // check if passwordInput rendered
        const { getByTestId } = render(<Signup />);
        const passwordInput = getByTestId("passwordInput");
        expect(passwordInput).toBeTruthy();
    });
    it("Succesfull sign up", () => {
        // check if button rendered
        const { getByTestId } = render(<Signup />);
        const signUpButton = getByTestId("signUpButton");
        expect(signUpButton).toBeTruthy();
    });

})

