import * as React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
  }
>(({ className = "", children, ...props }, ref) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
