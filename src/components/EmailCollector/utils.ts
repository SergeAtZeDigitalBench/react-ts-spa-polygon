export const mockResolveValue = <D = unknown>(
  data: D,
  errorMessage?: string
): Promise<D> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!!errorMessage) {
        reject(errorMessage);
      } else {
        resolve(data);
      }
    }, 800);
  });

export const API_ENDPOINTS = {
  EMAIL_VERIFY: "auth/verify-email",
  SIGNIN: "auth/signin",
};

export const mockApiCall = async <D = unknown>({
  url,
  options,
  resolveValue,
  errorMessage,
}: {
  url: string;
  options: RequestInit;
  resolveValue: D;
  errorMessage?: string;
}): Promise<D> => {
  return mockResolveValue<D>(resolveValue, errorMessage);
};
