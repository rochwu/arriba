// For aesthetics we don't show 0
export const Value = ({children}: {children: number}) => {
  return children ? children : null;
};
