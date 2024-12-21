import { useLanguage } from "../Extras/LanguageProvider";
import { PieChart as RechartsChart, Pie, Cell } from 'recharts';

function PieChart({ resolved, unresolved }) {
  const { t } = useLanguage();
  const total = resolved + unresolved;
  const resolvedPercentage = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const unresolvedPercentage = total > 0 ? 100 - resolvedPercentage : 100;

  const data = resolved === 0 ? [
    { name: 'unresolved', value: 1, percentage: '0%' }
  ] : resolvedPercentage === 100 ? [
    { name: 'resolved', value: 1, percentage: '100%' }
  ] : [
    { name: 'resolved', value: resolved, percentage: `${resolvedPercentage}%` },
    { name: 'unresolved', value: unresolved, percentage: `${unresolvedPercentage}%` }
  ];

  const COLORS = ['#22C55E', '#6B7280'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    if (resolved === 0) {
      return (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          className="select-none pointer-events-none text-lg font-bold"
        >
          0%
        </text>
      );
    }

    if (resolvedPercentage === 100) {
      return (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          className="select-none pointer-events-none text-lg font-bold"
        >
          100%
        </text>
      );
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        className="select-none pointer-events-none text-lg font-bold"
      >
        {percentage}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center gap-5 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {t('taskProgress')}
      </h3>

      <div className="relative w-40 h-40">
        <RechartsChart width={160} height={160}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={75}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            strokeWidth={resolved === 0 || resolvedPercentage === 100 ? 0 : 1}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={resolved === 0 ? '#6B7280' : resolvedPercentage === 100 ? '#22C55E' : COLORS[index]} 
                className={resolved === 0 ? "dark:fill-gray-500" : resolvedPercentage === 100 ? "dark:fill-green-500" : index === 0 ? "dark:fill-green-500" : "dark:fill-gray-500"}
              />
            ))}
          </Pie>
        </RechartsChart>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[600px] bg-gray-50 dark:bg-slate-700/50 p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500 dark:bg-green-500 shadow-sm" />
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              {t('resolved')}
            </span>
          </div>
          <span className="text-base font-bold text-gray-800 dark:text-white">
            {resolved} ({resolvedPercentage}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-500 dark:bg-gray-500 shadow-sm" />
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              {t('unresolved')}
            </span>
          </div>
          <span className="text-base font-bold text-gray-800 dark:text-white">
          {unresolved}({unresolvedPercentage}%) 
          </span>
        </div>
        <div className="mt-1 pt-3 border-t border-gray-200 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              {t('total')}
            </span>
            <span className="text-base font-bold text-gray-800 dark:text-white">
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;