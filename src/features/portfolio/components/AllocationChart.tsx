import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartAllocation } from '@/shared/types';

interface AllocationChartProps {
  data: ChartAllocation[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartAllocation }> }) {
  if (!active || !payload?.[0]) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded border border-surface-border bg-surface px-2.5 py-1.5">
      <p className="text-[11px] text-white">{item.name}</p>
      <p className="font-mono text-[12px] font-semibold text-accent-green">{item.value.toFixed(1)}%</p>
    </div>
  );
}

export function AllocationChart({ data }: AllocationChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-[12px] text-secondary">No allocation data</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-32 w-32 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={58}
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

      <div className="flex flex-col gap-1.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-secondary">{item.name}</span>
            <span className="ml-auto font-mono text-[11px] font-medium text-white">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
