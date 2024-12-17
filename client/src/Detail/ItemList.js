import { useContext, useState, useMemo } from "react";
import { DetailContext } from "./DetailProvider";
import { useLanguage } from "./LanguageProvider";
import Item from "./Item";
import PieChart from "./PieChart";

function ItemList() {
  const { lists, activeListId, handlerMap, showResolved, toggleShowResolved } = useContext(DetailContext);
  const { t } = useLanguage();
  const [showChart, setShowChart] = useState(true);

  const activeList = lists.find(list => list.id === activeListId);

  const stats = useMemo(() => {
    if (!activeList?.itemList) {
      return { resolved: 0, unresolved: 0 };
    }
    const resolved = activeList.itemList.filter(item => item.resolved).length;
    const unresolved = activeList.itemList.filter(item => !item.resolved).length;
    return { resolved, unresolved };
  }, [activeList]);

  if (!activeList) return null;

  const filteredItems = showResolved
    ? activeList.itemList
    : activeList.itemList.filter(item => !item.resolved);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr_3fr] border-2 border-green-500 dark:border-green-400 m-3 p-3 min-h-[110px] bg-white dark:bg-slate-800 transition-colors duration-200">
      <div className="col-start-1 row-start-2 grid gap-2">
        <div className="space-y-2">
          <button
            onClick={() => handlerMap.addItem({ listId: activeListId })}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 max-w-[170px] dark:bg-green-600 dark:hover:bg-green-700"
          >
            {t('addItem')}
            <span className="text-lg">+</span>
          </button>
          <button
            onClick={() => toggleShowResolved()}
            className="px-3 py-1 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 max-w-[170px] dark:text-white"
          >
            {showResolved ? t('showUnresolved') : t('showAll')}
          </button>
          <button
            onClick={() => setShowChart(prev => !prev)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 max-w-[170px] dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {showChart ? t('hideChart') : t('showChart')}
          </button>
          {showChart && (
            <div className="mt-4 w-full">
              <PieChart 
                resolved={stats.resolved} 
                unresolved={stats.unresolved} 
              />
            </div>
          )}
        </div>
      </div>
      <div className="col-start-2 row-start-2 grid gap-2">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            data={item}
            listId={activeListId}
            handlerMap={handlerMap}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;