import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DonutChart = ({
  percentage = 0,
  title = "keep up your progress",
  size = 200,
  strokeWidth = 20,
  activeColor = "#10b981", 
  backgroundColor = "#d1fae5", 
  centerTextColor = "#1f2937", 
  titleColor = "#6b7280", 
  showTooltip = true,
  className = "",
}) => {
  
  const data = [
    { name: "completed", value: percentage, color: activeColor },
    { name: "remaining", value: 100 - percentage, color: backgroundColor },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0].payload.name === "completed"
    ) {
      return (
        <div className="bg-background text-foreground p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-semibold text-foreground">{`${payload[0].value}% ${title}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col bg-background text-foreground">
      <div
        className={`flex justify-center items-center  flex-col   h-80   ${className}`}
      >
        <div
          className="relative flex justify-center items-center  h-full"
          style={{ width: size, height: size }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={size * 0.3}
                outerRadius={size * 0.45}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-2xl font-bold"
              style={{ color: centerTextColor }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Title */}
      </div>
      <p
        className=" text-sm align-text-bottom h-10 font-medium text-center"
        style={{ color: titleColor }}
      >
        {title}
      </p>
    </div>
  );
};

export default DonutChart;
