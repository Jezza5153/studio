'use client';

import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export function ReserveerButton({ label = 'Reserveer', ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        window.taplaOpen?.();
      }}
    >
      {label}
    </button>
  );
}
