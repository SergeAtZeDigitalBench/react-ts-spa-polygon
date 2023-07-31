import React, { useState, useEffect } from "react";

import EmailCollectorForm from "./EmailCollectorForm";
import { mockApiCall, mockResolveValue, API_ENDPOINTS } from "./utils";
import { IFormState, Mode } from "./types";
export * from "./types";

const { EMAIL_VERIFY, SIGNIN } = API_ENDPOINTS;

const validateFields = (mode: Mode, values: IFormState): string | null => {
  const { email, password } = values;

  if (mode === "email_collect" && !email.trim()) {
    return "Email is required";
  }

  if (mode === "current_user_email" && !email.trim()) {
    return "Email is required";
  }

  if (mode === "password" && (!email.trim() || !password.trim())) {
    return "Both email and password are required";
  }

  return null;
};

interface IState {
  mode: Mode;
  isLoading: boolean;
  error: null | string;
}

const INITIAL_FORM_VALUES: IFormState = { email: "", password: "" };

interface IProps {
  email?: string;
}

const EmailCollectorContainer = ({ email }: IProps): JSX.Element => {
  const [state, setState] = useState<IState>({
    mode: !email ? "email_collect" : "current_user_email",
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

  const verifyEmail = async (email: string) => {
    setState((current) => ({
      ...current,
      error: null,
      isLoading: true,
    }));
    try {
      const response = await mockApiCall({
        url: EMAIL_VERIFY,
        options: {
          method: "POST",
          body: JSON.stringify({ email }),
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

  const authenticateUser = async ({ email, password }: IFormState) => {
    setState((current) => ({
      ...current,
      error: null,
      isLoading: true,
    }));
    try {
      const response = await mockApiCall({
        url: SIGNIN,
        options: {
          method: "POST",
          body: JSON.stringify({ email, password }),
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

  const verifyUserCanSubscribe = async (email: string) => {
    setState((current) => ({
      ...current,
      error: null,
      isLoading: true,
    }));
    try {
      const response = await mockResolveValue({ email });
      setState((current) => ({
        ...current,
        isLoading: false,
        mode: "email_collect",
      }));
      alert(`can subscribe to email: ${response.email}`);
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

  const resetForm = () => setFormValues(INITIAL_FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errorMessage = validateFields(state.mode, formValues);

    if (errorMessage !== null) {
      setState((current) => ({
        ...current,
        error: errorMessage,
      }));
      return;
    }

    if (state.mode === "email_collect") {
      await verifyEmail(formValues.email);
    } else if (state.mode === "password") {
      await authenticateUser(formValues);
      resetForm();
    } else {
      await verifyUserCanSubscribe(formValues.email);
      resetForm();
    }
  };

  useEffect(() => {
    setFormValues((current) => ({ ...current, email: email || "" }));
    setState((current) => ({
      ...current,
      mode: email ? "current_user_email" : "email_collect",
    }));
  }, [email]);

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

export default EmailCollectorContainer;
