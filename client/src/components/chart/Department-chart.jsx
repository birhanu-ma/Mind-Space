import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function DepartmentChart({ data = [], title }) {
  if (!data.length) return null;

  const total = data.reduce((sum, d) => sum + (d.count || 0), 0);
  const maxValue = total || 1;

  const formatLabel = (v) => (v >= 1000 ? `${Math.round(v / 1000)}K` : v);
  const labels = Array.from({ length: 5 }, (_, i) =>
    parseFloat((maxValue * (i / 4)).toFixed(1))
  ).filter((v, i, arr) => v !== arr[i - 1]);

  return (
    <Card className="bg-background text-foreground border border-border w-full sm:w-1/2">
      <CardHeader>
        <CardTitle className="text-start">{title}</CardTitle>
        <p className="text-start text-foreground/70">
          {total.toLocaleString()}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {data.map((dept, i) => {
            const value = dept.count || 0;
            const percent = Math.min((value / maxValue) * 100, 100);

            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-sm text-foreground/60 text-right">
                  {dept._id || "Unknown"}
                </div>
                <div className="flex-1 relative">
                  <div className="h-6 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: dept.color || "#1aa367",
                      }}
                    />
                  </div>
                  <span className="absolute right-2 top-0 text-xs text-white font-medium leading-6">
                    {value.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-foreground/60 mt-4">
          {labels.map((label, i) => (
            <span key={i}>{formatLabel(label)}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;
