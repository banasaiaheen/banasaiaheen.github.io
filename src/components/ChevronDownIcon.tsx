type ChevronDownIconProps = {
  size?: number;
  className?: string;
};

export default function ChevronDownIcon({ size = 16, className }: ChevronDownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
