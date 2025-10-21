"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-white font-medium">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400",
              "focus:outline-none focus:border-orange-500 focus:bg-white/15 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-10",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            {...props}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
