export const classnames = (...maybeClassNames: unknown[]) =>
  maybeClassNames
    .filter((currentClassname) => {
      return typeof currentClassname === "string" && !!currentClassname;
    })
    .join(" ");
