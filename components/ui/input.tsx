import { cn } from "../../lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400",
            "focus:outline-none focus:ring-2 transition-all duration-200",
            error
              ? "border-red-500 focus:ring-red-500/50"
              : "border-white/20 focus:ring-orange-500/50 focus:border-orange-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
