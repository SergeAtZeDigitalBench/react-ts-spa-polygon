export const mockApiRequest = <D = unknown>(
  data: D,
  rejectError: null | string = null
): Promise<D> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!!rejectError) {
        reject(rejectError);
      }

      resolve(data);
    }, 800);
  });
