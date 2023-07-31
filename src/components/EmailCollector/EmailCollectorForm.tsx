import React from "react";

import { IFormState, Mode } from "./types";

interface IProps {
  mode: Mode;
  formValues: IFormState;
  handleSubmit: (event: React.FormEvent) => Promise<void> | void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: null | string;
  isLoading: boolean;
}

const getButtonContent = ({
  mode,
  isLoading,
}: Pick<IProps, "mode" | "isLoading">): string => {
  if (isLoading) {
    return mode !== "password" ? "Subscribing..." : "Signing in...";
  }
  return mode === "email_collect" ? "Subscribe" : "Sign in";
};

/**
 * @description email collector UI, for state management POC
 * @param {IProps} props
 * @returns {JSX.Element} form markup based on mode
 */
const EmailCollectorForm = ({
  mode,
  formValues,
  handleChange,
  handleSubmit,
  error,
  isLoading,
}: IProps): JSX.Element => {
  const isEmailInput =
    mode === "email_collect" || mode === "current_user_email";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex">
        {isEmailInput ? (
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="px-4 py-2 bg-white text-black flex-1"
            disabled={isLoading}
            placeholder="Enter email address"
          />
        ) : (
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="px-4 py-2 bg-white text-black flex-1"
            disabled={isLoading}
            placeholder="Enter password"
          />
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-700 min-w-[150px]"
          disabled={isLoading}
        >
          {getButtonContent({ mode, isLoading })}
        </button>
      </div>
      {error && (
        <div className="px-4 py-2 bg-red-500 font-bold text-white">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default EmailCollectorForm;
