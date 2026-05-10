interface NetworkBadgeProps {
  label: string;
  color: string;
}

export function NetworkBadge({ label, color }: NetworkBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[11px] font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
