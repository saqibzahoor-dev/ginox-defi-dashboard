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
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {icon && <div className="mb-3 text-secondary/50">{icon}</div>}
      <h3 className="mb-1 text-sm font-medium text-white">{title}</h3>
      <p className="mb-4 max-w-[260px] text-[12px] text-secondary">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded bg-accent-green px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-accent-green/90"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
