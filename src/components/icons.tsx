import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Duotone icon set. The lighter "fill" layer sits behind the bolder stroke,
 * both driven by `currentColor` so the parent can recolor on hover.
 */

export function TrainingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 3 2 8l10 5 10-5-10-5Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path
        d="M12 3 2 8l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5M21 8v5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={9} fill="currentColor" fillOpacity={0.18} />
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.6} />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 7h4l5 4 5-4h4v9h-4l-3 3-3-3H3V7Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path
        d="M7 7 3 7v8h3.5M17 7l4 0v8h-3.5M7 11l3 3M12 11l5-4M12 18l-3-3M14.5 15.5 12 13"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 3 5 6v5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6l-7-3Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path
        d="M12 3 5 6v5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GrowthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-6h4v6h-4Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path
        d="M4 20V10h4v10M10 20V4h4v16M16 20v-6h4v6M3 20h18"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommunityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={9} cy={8} r={3} fill="currentColor" fillOpacity={0.18} />
      <circle cx={16} cy={9} r={2.4} fill="currentColor" fillOpacity={0.18} />
      <path
        d="M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c-3 0-5 1.8-5 4.5V18h10v-1.5M16 9a2.4 2.4 0 1 0 0-4.8M16 9c2.4 0 4 1.5 4 3.8V18h-4"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.5 6C6.5 6 4 8.6 4 12v6h6v-6H7c0-1.9 1.2-3.3 2.9-3.6L9.5 6Zm10 0c-3 0-5.5 2.6-5.5 6v6h6v-6h-3c0-1.9 1.2-3.3 2.9-3.6L19.5 6Z" />
    </svg>
  );
}
