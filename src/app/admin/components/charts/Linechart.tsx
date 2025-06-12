"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    SummitSeaker: 4000,
    PeakElite: 2400,
  },
  {
    name: 'Feb',
    SummitSeaker: 3000,
    PeakElite: 1398,
  },
  {
    name: 'Mar',
    SummitSeaker: 2000,
    PeakElite: 5500,
  },
  {
    name: 'Apr',
    SummitSeaker: 2780,
    PeakElite: 3908,
  },
  {
    name: 'May',
    SummitSeaker: 1890,
    PeakElite: 4800,
  },
  {
    name: 'Jun',
    SummitSeaker: 2390,
    PeakElite: 3800,
  },
  {
    name: 'Jul',
    SummitSeaker: 3490,
    PeakElite: 4300,
  },
  {
    name: 'Aug',
    SummitSeaker: 3220,
    PeakElite: 4220,
  },
  {
    name: 'Sep',
    SummitSeaker: 3550,
    PeakElite: 4550,
  },
  {
    name: 'Okt',
    SummitSeaker: 3220,
    PeakElite: 4220,
  },
  {
    name: 'Nov',
    SummitSeaker: 3110,
    PeakElite: 4110,
  },
  {
    name: 'Dec',
    SummitSeaker: 3440,
    PeakElite: 4440,
  },
];

export default function Linechart() {
    return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={400}
        height={300}
        data={data}
        
        margin={{
          top: 35,
          right: 30,
          left: 1,
          bottom: 5,
          
          }}
        >
        <CartesianGrid 
          strokeDasharray="1 2" 
          stroke="var(--blue3)"
        />
        <XAxis 
          dataKey="name"
          fill='var(--color-text6)'
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone"
          dataKey="SummitSeaker"
          stroke="var(--blue3)"
          strokeWidth="1.5"
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone"
          dataKey="PeakElite"
          stroke="var(--blue2)"
        />
      </LineChart>
    </ResponsiveContainer>
    )
}