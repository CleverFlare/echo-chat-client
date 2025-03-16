import React, { ReactNode, ReactElement } from "react";

export function useNamedBlocks(children: ReactNode) {
  const arr = React.Children.toArray(children) as ReactElement[];

  return <T extends React.ElementType>(
    Component: T,
    many: boolean = false,
  ): ReactElement<T>[] | ReactElement<T> | undefined =>
    many
      ? (arr.filter(
          (child) => React.isValidElement(child) && child.type === Component,
        ) as ReactElement<T>[])
      : (arr.find(
          (child) => React.isValidElement(child) && child.type === Component,
        ) as ReactElement<T> | undefined);
}
