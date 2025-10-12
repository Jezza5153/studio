import type { SVGProps } from "react";

export function DutchFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" {...props}>
      <rect fill="#21468B" width="9" height="6"/>
      <rect fill="#FFF" width="9" height="4"/>
      <rect fill="#AE1C28" width="9" height="2"/>
    </svg>
  );
}

export function BritishFlag(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
            <clipPath id="a">
                <path d="M0 0v30h60V0z"/>
            </clipPath>
            <path d="M0 0v30h60V0z" fill="#012169"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 30m0-30L0 30" clipPath="url(#a)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
    )
}
