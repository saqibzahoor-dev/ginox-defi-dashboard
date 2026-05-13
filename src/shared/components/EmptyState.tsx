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
      {icon && <div className="mb-4 text-tertiary">{icon}</div>}
      <h3 className="mb-1.5 font-display text-[15px] font-semibold text-primary">{title}</h3>
      <p className="mb-5 max-w-[280px] text-[13px] leading-relaxed text-secondary">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-lg bg-accent-green px-5 py-2.5 text-[13px] font-semibold text-page transition-all hover:brightness-110"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
