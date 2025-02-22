import { useContext, useState } from "react";
import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import { useLanguage } from "./Extras/LanguageProvider";
import UpdateNameForm from "./Modal/UpdateNameForm";
import CreateListForm from "./Modal/CreateListForm";
import ListBarChart from "./Graphs/BarChart";
import { useNavigate, useLocation } from "react-router-dom";

function ShoppingLists({ onListSelect }) {
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const { data, lists, activeListId, setActiveListId, handlerMap } = useContext(DetailContext);
  const { loggedInUser } = useContext(UserContext);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredLists = lists.filter(list =>
    (list.owner === loggedInUser || list.memberList.includes(loggedInUser)) &&
    (showArchived ? list.archived : !list.archived)
  );

  const itemCounts = lists.reduce((counts, list) => {
    counts[list.id] = list.itemList.length;
    return counts;
  }, {});

  const handleListClick = (listId) => {
    setActiveListId(listId);
    if (location.pathname === '/shoppingLists') {
      navigate('/detail');
    }
    onListSelect && onListSelect();
  };

  const getMaxHeight = () => {
    const baseHeight = "calc(100vh - 16rem)"; 
    return showChart ? "calc(100vh - 40rem)" : baseHeight;
  };

  return (
    <div className="p-3 flex flex-col h-full">
      <h2 className="text-xl font-bold dark:text-white mb-3">{t('shoppingLists')}</h2>
      
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setShowCreateList(true)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1 dark:bg-green-600 dark:hover:bg-green-700"
        >
          {t('newList')} +
        </button>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm flex items-center gap-1 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          {showArchived ? t('showActive') : t('showArchived')}
        </button>
        <button
          onClick={() => setShowChart(!showChart)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {showChart ? t('hideChart') : t('showChart')}
        </button>
      </div>

      {showChart && (
        <div className="mb-4">
          <ListBarChart lists={lists} />
        </div>
      )}

      <div 
        className="overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        style={{ maxHeight: getMaxHeight() }}
      >
        <div className="grid gap-2">
          {filteredLists.map(list => (
            <div key={list.id}>
              <button
                onClick={() => handleListClick(list.id)}
                className={`w-full p-2 rounded text-left transition-colors border-2 ${
                  list.id === activeListId
                    ? 'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-400'
                    : 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 dark:text-white border-gray-300 dark:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{list.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {itemCounts[list.id]} {t('item', itemCounts[list.id])}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {list.owner === loggedInUser ? `(${t('owner')})` : `(${t('member')})`}
                    </span>
                    {loggedInUser === list.owner && (
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveListId(list.id);
                            setShowUpdateName(true);
                          }}
                          className="px-3 py-1 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 text-sm flex items-center dark:text-white"
                          aria-label={t('editList')}
                        >
                          <span className="text-base">✎</span>
                        </button>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <UpdateNameForm
        show={showUpdateName}
        handleClose={() => setShowUpdateName(false)}
        data={data}
        handlerMap={handlerMap}
      />
      <CreateListForm
        show={showCreateList}
        handleClose={() => setShowCreateList(false)}
        handlerMap={handlerMap}
      />
    </div>
  );
}

export default ShoppingLists;