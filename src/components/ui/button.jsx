// import React from 'react'
import { twMerge } from "tailwind-merge";
import { cn } from "../../lib/utilities";

function Button({ title, onClick, disabled, loading,type, className }) {
  return (
    <button
    type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(`bg-firstColor hover:bg-firstColorAlt text-brightColor  rounded-full px-6 py-2 text-white transition-all hover:text-white`,
        className,
        {
          "pointer-events-none select-none bg-red-900 bg-opacity-50 ":
            loading || disabled,
        },
      )}
    >
      {title}
    </button>
  );
}

export default Button;
