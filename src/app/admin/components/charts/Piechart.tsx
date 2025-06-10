"use client";

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const data = [
  { name: 'Peak Elite', value: 100 },
  { name: 'Summit Seeker', value: 200 },
  { name: 'Basecamp', value: 500 },
];

interface PieChartProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number; 
  outerRadius: number;
  percent: number; 
  index: number; 
}


export default function Piechart() {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: PieChartProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="var(--gray4)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLORS = ["var(--blue1)", "var(--blue2)", "var(--blue3)"];

  return (
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          // label
          outerRadius={80}
          fill="transparent"
          stroke="var(--background2)"
          strokeWidth="1.5"
          dataKey="value"

        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend
          wrapperStyle={{
            bottom: '0',
            width: '100%',
            display: 'flex',
            alignContent: 'flex-end',
            justifyContent: 'center',
            
          }}
        />
      </PieChart>
  )
}