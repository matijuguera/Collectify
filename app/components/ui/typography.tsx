import clsx from "clsx";
import * as React from "react";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export const Header = ({ className, children }: TypographyProps) => (
  <h1 className={clsx(className, "text-xl font-bold")}>{children}</h1>
);

export const Subheader = ({ className, children }: TypographyProps) => (
  <h2 className={clsx(className, "text-l font-semibold")}>{children}</h2>
);

export const Label = ({ className, children }: TypographyProps) => (
  <label className={clsx(className, "text-sm font-medium")}>{children}</label>
);
