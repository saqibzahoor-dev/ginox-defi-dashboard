import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartAllocation } from '@/shared/types';

interface AllocationChartProps {
  data: ChartAllocation[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartAllocation }> }) {
  if (!active || !payload?.[0]) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-border bg-surface-elevated px-3.5 py-2.5 shadow-lg">
      <p className="text-[13px] font-medium text-primary">{item.name}</p>
      <p className="font-mono text-[14px] font-semibold text-accent-green">{item.value.toFixed(1)}%</p>
    </div>
  );
}

export function AllocationChart({ data }: AllocationChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-36 items-center justify-center">
        <p className="text-[13px] text-secondary">No allocation data</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <div className="h-36 w-36 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={64}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[13px] text-secondary">{item.name}</span>
            <span className="ml-auto font-mono text-[13px] font-semibold text-primary">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
