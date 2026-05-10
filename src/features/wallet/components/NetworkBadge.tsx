interface NetworkBadgeProps {
  label: string;
  color: string;
}

export function NetworkBadge({ label, color }: NetworkBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-[3px]"
      style={{ backgroundColor: `${color}10` }}
    >
      <span
        className="h-[6px] w-[6px] rounded-full shadow-sm"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}50` }}
      />
      <span className="text-[11px] font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
