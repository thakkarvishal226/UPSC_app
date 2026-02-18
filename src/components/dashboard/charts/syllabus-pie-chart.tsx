"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

export function SyllabusPieChart() {
  const { getProgress } = useSyllabus();
  const { completed, total } = getProgress();
  const remaining = total - completed;
  const { theme } = useTheme();

  const data = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#10b981", theme === "dark" ? "#374151" : "#e5e7eb"];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Completion Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
            <span className="text-2xl font-bold">{Math.round((completed / total) * 100) || 0}%</span>
            <span className="text-sm text-muted-foreground ml-2">Total Progress</span>
        </div>
      </CardContent>
    </Card>
  );
}
