import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#EAB308",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value, color } = payload[0];
    return (
      <div className="bg-background text-foreground p-3 rounded-lg shadow border border-border">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-foreground/60">Count: {value}</p>
        <p className="text-xs font-medium" style={{ color }}>
          Item color indicator
        </p>
      </div>
    );
  }
  return null;
};

const Legend = ({ payload }) => (
  <div className="flex flex-col ml-6 text-sm">
    <div className="grid grid-cols-2 gap-4 text-foreground/60 mb-1 text-xs font-medium">
      <span>Year</span>
      <span>Count</span>
    </div>
    {payload.map((entry, i) => (
      <div key={i} className="grid grid-cols-2 gap-4 items-center">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </div>
        <span className="font-semibold">{entry.payload.value}</span>
      </div>
    ))}
  </div>
);

function PieChartComponent({
  data = [],
  title = "Mentees by Year",
  colors = COLORS,
  width = 240,
  height = 240,
  innerRadius = 60,
  outerRadius = 100,
  showLegend = true,
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-background p-6 rounded-lg text-foreground border border-border">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="h-48 flex items-center justify-center text-foreground/60">
          No data available
        </div>
      </div>
    );
  }

  // Directly use passed data, no recalculation
  const chartData = data.map((d) => ({
    label: `Year ${d._id}`,
    value: d.count,
  }));

  const totalValue = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-background p-6 rounded-lg text-foreground border border-border">
      <h2 className="text-start mb-6">{title}</h2>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="relative">
          <ResponsiveContainer width={width} height={height}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={3}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-foreground/60">Total</span>
            <span className="text-2xl font-bold">{totalValue}</span>
          </div>
        </div>

        {showLegend && (
          <Legend
            payload={chartData.map((d, i) => ({
              value: d.label,
              color: colors[i % colors.length],
              payload: d,
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default PieChartComponent;
