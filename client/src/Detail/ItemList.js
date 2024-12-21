import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DetailContext } from "./DetailProvider";
import { useLanguage } from "./Extras/LanguageProvider";
import Item from "./Item";
import PieChart from "./Graphs/PieChart";

function ItemList() {
  const navigate = useNavigate();
  const { lists, activeListId, handlerMap } = useContext(DetailContext);
  const { t } = useLanguage();
  const [showChart, setShowChart] = useState(false);
 
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
  const isArchived = activeList.archived;

  const unresolvedItems = activeList.itemList.filter(item => !item.resolved);
  const resolvedItems = activeList.itemList.filter(item => item.resolved);

  return (
    <div className="p-3 h-full flex flex-col">
      {/* Header section - centered */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
           {!isArchived && (
            <button
              onClick={() => handlerMap.addItem({ listId: activeListId })}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
            >
              {t('addItem')}
              <span className="text-lg">+</span>
            </button>
          )}
            <button
              onClick={() => setShowChart(prev => !prev)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              {showChart ? t('showItems') : t('showChart')}
            </button>
            <button
              onClick={() => navigate('/member')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 transition-colors lg:hidden"
            >
              {t('showMembers')}
            </button>
          </div>
        </div>
     
      {showChart ? (
        <div className="flex justify-center items-start">
          <PieChart
            resolved={stats.resolved}
            unresolved={stats.unresolved}
          />
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          <div className="max-w-3xl mx-auto px-4">
            {/* Nevyřízené položky */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">{t('unresolved')}</h3>
              <div className="grid gap-3">
                {unresolvedItems.map((item) => (
                  <Item
                    key={item.id}
                    data={item}
                    listId={activeListId}
                    handlerMap={handlerMap}
                    readonly={isArchived}
                  />
                ))}
              </div>
            </div>
           
            {/* Vyřízené položky */}
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">{t('resolved')}</h3>
              <div className="grid gap-3">
                {resolvedItems.map((item) => (
                  <Item
                    key={item.id}
                    data={item}
                    listId={activeListId}
                    handlerMap={handlerMap}
                    readonly={isArchived}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;