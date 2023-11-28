/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { getByTestId, getByRole, getByLabelText } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import SignInPage from "../../pages/signIn/index";
import { handleSignInForm } from "./index";

beforeEach(() => {
  document.body.innerHTML = SignInPage.render();
  handleSignInForm();
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("SignInForm integration test suites", () => {
  it("should show an error message for wrong email", () => {
    userEvent.type(
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@thomas.com"
    );

    userEvent.click(getByRole(document.body, "button"));

    expect(getByTestId(document.body, "user-email-error-msg")).not.toHaveClass(
      "hidden"
    );
  });

  it("should not show an error message for email and show one for password", () => {
    userEvent.type(
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com"
    );

    userEvent.click(getByRole(document.body, "button"));

    expect(getByTestId(document.body, "user-email-error-msg")).toHaveClass(
      "hidden"
    );

    expect(
      getByTestId(document.body, "user-password-error-msg")
    ).not.toHaveClass("hidden");
  });

  it("should not show an error message for email and show one for password", () => {
    userEvent.type(
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com"
    );

    userEvent.type(
      getByLabelText(document.body, "Votre mot de passe"),
      "helloworld"
    );

    userEvent.click(getByRole(document.body, "button"));

    expect(
      getByTestId(document.body, "user-password-error-msg")
    ).not.toHaveClass("hidden");
  });

  it("should not show any error message", () => {
    userEvent.type(
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com"
    );

    userEvent.type(
      getByLabelText(document.body, "Votre mot de passe"),
      "azerty"
    );

    userEvent.click(getByRole(document.body, "button"));

    expect(getByTestId(document.body, "user-email-error-msg")).toHaveClass(
      "hidden"
    );

    expect(getByTestId(document.body, "user-password-error-msg")).toHaveClass(
      "hidden"
    );
  });
});
