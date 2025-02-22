import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLanguage } from '../Extras/LanguageProvider';

const ListBarChart = ({ lists }) => {
  const { t } = useLanguage();
  const data = lists.map(list => ({
    name: list.name,
    items: list.itemList.length,
  }));

  return (
    <div className="flex flex-col items-center mb-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {t('shoppingLists')}
      </h3>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'currentColor', fontSize: 14, fontWeight: 'bold' }}
          tickLine={{ stroke: 'currentColor' }}
          className="text-gray-900 dark:text-white"
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: 'currentColor', fontSize: 14, fontWeight: 'bold' }}
          tickLine={{ stroke: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          className="text-gray-900 dark:text-white"
        />
        <Tooltip cursor={false} />
        <Bar
          dataKey="items"
          name={t('items')}
          fill="#3B82F6"
          stroke="#1D4ED8"
          strokeWidth={2}
          maxBarSize={60}
        />
      </BarChart>
    </div>
  );
};

export default ListBarChart;