import React, { useState } from "react";

import EmailCollectorForm from "./EmailCollectorForm";
import { mockApiCall, API_ENDPOINTS } from "./utils";

const { EMAIL_VERIFY, SIGNIN } = API_ENDPOINTS;

const validateFields = (
  mode: "email_collect" | "password",
  values: IFormState
): string | null => {
  const { email, password } = values;

  if (mode === "email_collect" && !email.trim()) {
    return "Email is required";
  }

  if (mode === "password" && (!email.trim() || !password.trim())) {
    return "Both email and password are required";
  }
  return null;
};

interface IState {
  mode: "email_collect" | "password";
  isLoading: boolean;
  error: null | string;
}
export interface IFormState {
  email: string;
  password: string;
}

const INITIAL_FORM_VALUES: IFormState = { email: "", password: "" };

interface IProps {
  [x: string]: unknown;
}

const EmailCollector = ({}: IProps): JSX.Element => {
  const [state, setState] = useState<IState>({
    mode: "email_collect",
    isLoading: false,
    error: null,
  });
  const [formValues, setFormValues] = useState<IFormState>(INITIAL_FORM_VALUES);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errorMessage = validateFields(state.mode, formValues);
    setState((current) => ({
      ...current,
      error: errorMessage,
      isLoading: !errorMessage,
    }));

    if (!!errorMessage) return;

    try {
      if (state.mode === "email_collect") {
        const response = await mockApiCall({
          url: EMAIL_VERIFY,
          options: {
            method: "POST",
            body: JSON.stringify({ email: formValues.email }),
          },
          resolveValue: {
            isExisting: true,
            isAuthenticated: false,
          },
        });

        setState((current) => ({
          ...current,
          isLoading: false,
          mode: response.isExisting ? "password" : "email_collect",
        }));
      } else {
        const response = await mockApiCall({
          url: SIGNIN,
          options: {
            method: "POST",
            body: JSON.stringify({ email: formValues.email }),
          },
          resolveValue: {
            isExisting: true,
            isAuthenticated: true,
          },
        });
        setState((current) => ({
          ...current,
          isLoading: false,
          mode: response.isAuthenticated ? "email_collect" : "password",
        }));
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Form submission failed";
      setState((current) => ({
        ...current,
        isLoading: false,
        error: message,
      }));
    }
  };

  return (
    <div className=" h-[90vh] flex flex-col justify-center items-center bg-gray-300">
      <div className=" border border-gray-500 p-4 min-w-[500px]">
        <EmailCollectorForm
          mode={state.mode}
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={state.isLoading}
          error={state.error}
        />
      </div>
    </div>
  );
};

export default EmailCollector;
