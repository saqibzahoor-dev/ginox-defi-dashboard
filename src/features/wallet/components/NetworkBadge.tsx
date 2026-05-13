interface NetworkBadgeProps {
  label: string;
  color: string;
}

export function NetworkBadge({ label, color }: NetworkBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-md px-2 py-0.5"
      style={{ backgroundColor: `${color}10` }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
