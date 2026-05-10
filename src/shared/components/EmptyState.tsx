interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      {icon && <div className="mb-4 text-secondary/60">{icon}</div>}
      <h3 className="mb-1.5 text-sm font-semibold text-white">{title}</h3>
      <p className="mb-5 max-w-[280px] text-[12px] leading-relaxed text-secondary">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-xl bg-accent-gradient px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_0_20px_-6px_rgba(10,196,136,0.3)] transition-all hover:shadow-[0_0_24px_-4px_rgba(10,196,136,0.4)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
