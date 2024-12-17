import { useLanguage } from "./LanguageProvider";

function PieChart({ resolved, unresolved }) {
  const { t } = useLanguage();
  const total = resolved + unresolved;
  const resolvedPercentage = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const unresolvedPercentage = 100 - resolvedPercentage;
  
  const generatePieSlices = () => {
    if (total === 0) return null;

    const resolvedAngle = (resolved / total) * 360;
    const radius = 50;
    const labelRadius = resolvedPercentage === 100 ? 0 : 35;
    const center = { x: 50, y: 50 };

    const toRadians = (angle) => angle * (Math.PI / 180);

    const resolvedLabelAngle = resolvedAngle / 2;
    const unresolvedLabelAngle = resolvedAngle + (360 - resolvedAngle) / 2;

    const resolvedLabelX = center.x + labelRadius * Math.cos(toRadians(resolvedLabelAngle - 90));
    const resolvedLabelY = center.y + labelRadius * Math.sin(toRadians(resolvedLabelAngle - 90));
    
    const unresolvedLabelX = center.x + labelRadius * Math.cos(toRadians(unresolvedLabelAngle - 90));
    const unresolvedLabelY = center.y + labelRadius * Math.sin(toRadians(unresolvedLabelAngle - 90));

    const endX = center.x + radius * Math.cos(toRadians(resolvedAngle - 90));
    const endY = center.y + radius * Math.sin(toRadians(resolvedAngle - 90));

    const largeArcFlag = resolvedAngle > 180 ? 1 : 0;

    const resolvedPath = resolvedAngle === 360
      ? `M${center.x},${center.y - radius} A${radius},${radius} 0 1,1 ${center.x - 0.001},${center.y - radius}`
      : `M${center.x},${center.y} L${center.x},${center.y - radius} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;

    const unresolvedPath = resolvedAngle === 360
      ? ""
      : `M${center.x},${center.y} L${endX},${endY} A${radius},${radius} 0 ${1 - largeArcFlag},1 ${center.x},${center.y - radius} Z`;

    return (
      <>
        <path 
          d={resolvedPath} 
          fill="#22C55E" 
          className="dark:fill-green-500-400 hover:opacity-90 transition-opacity" 
          stroke="#fff"
          strokeWidth="1"
        />
        <path 
          d={unresolvedPath} 
          fill="#6B7280" 
          className="dark:fill-gray-500 hover:opacity-90 transition-opacity" 
          stroke="#fff"
          strokeWidth="1"
        />
        
        {resolvedPercentage > 0 && (
          <g transform={resolvedPercentage === 100 
              ? `translate(${center.x},${center.y})` 
              : `translate(${resolvedLabelX},${resolvedLabelY})`}>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              transform="rotate(90)"
              className="select-none pointer-events-none"
            >
              {resolvedPercentage}%
            </text>
          </g>
        )}
        
        {unresolvedPercentage > 0 && (
          <g transform={`translate(${unresolvedLabelX},${unresolvedLabelY})`}>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              transform="rotate(90)"
              className="select-none pointer-events-none"
            >
              {unresolvedPercentage}%
            </text>
          </g>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('taskProgress')}</h3>

      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
          {generatePieSlices()}
        </svg>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[240px] bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 dark:bg-green-500-400 shadow-sm" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('resolved')}</span>
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-white">{resolved} ({resolvedPercentage}%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500 dark:bg-gray-500 shadow-sm" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('unresolved')}</span>
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-white">{unresolved} ({unresolvedPercentage}%)</span>
        </div>
        <div className="mt-1 pt-3 border-t border-gray-200 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('total')}</span>
            <span className="text-sm font-bold text-gray-800 dark:text-white">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;