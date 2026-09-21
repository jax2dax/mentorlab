'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { subjectsColors } from '@/constants';

interface SubjectBreakdown {
  subject: string;
  count: number;
}

interface ActivityPoint {
  date: string;
  count: number;
}

const formatDayLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const ActivityChart = ({ activity }: { activity: ActivityPoint[] }) => {
  const data = activity.map((point) => ({ ...point, label: formatDayLabel(point.date) }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={13} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={13} width={28} />
        <Tooltip
          cursor={{ fill: 'var(--muted)' }}
          contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
          formatter={(value) => [`${value} session${value === 1 ? '' : 's'}`, '']}
        />
        <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const SubjectChart = ({ breakdown }: { breakdown: SubjectBreakdown[] }) => {
  if (breakdown.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={Math.max(260, breakdown.length * 56)}>
      <BarChart
        data={breakdown}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
        <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} fontSize={13} />
        <YAxis
          type="category"
          dataKey="subject"
          tickLine={false}
          axisLine={false}
          fontSize={13}
          width={90}
          className="capitalize"
        />
        <Tooltip
          cursor={{ fill: 'var(--muted)' }}
          contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }}
          formatter={(value) => [`${value} session${value === 1 ? '' : 's'}`, '']}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={40}>
          {breakdown.map((entry) => (
            <Cell
              key={entry.subject}
              fill={subjectsColors[entry.subject as keyof typeof subjectsColors] ?? 'var(--primary)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
