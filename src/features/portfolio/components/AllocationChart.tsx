import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartAllocation } from '@/shared/types';

interface AllocationChartProps {
  data: ChartAllocation[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartAllocation }> }) {
  if (!active || !payload?.[0]) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[rgba(10,14,30,0.95)] px-3 py-2 shadow-xl backdrop-blur-sm">
      <p className="text-[11px] font-medium text-white">{item.name}</p>
      <p className="font-mono text-sm font-bold text-accent-green">{item.value.toFixed(1)}%</p>
    </div>
  );
}

export function AllocationChart({ data }: AllocationChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-[12px] text-secondary">No allocation data</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <div className="h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={72}
              paddingAngle={3}
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
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[12px] text-secondary">{item.name}</span>
            <span className="ml-auto font-mono text-[12px] font-semibold text-white">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
