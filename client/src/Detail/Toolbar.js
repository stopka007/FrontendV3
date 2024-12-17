import { useContext, useState } from "react";
import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import { useLanguage } from "./LanguageProvider";
import UpdateNameForm from "./Modal/UpdateNameForm";
import CreateListForm from "./Modal/CreateListForm";

function Toolbar() {
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const { data, lists, activeListId, setActiveListId, handlerMap } = useContext(DetailContext);
  const { loggedInUser } = useContext(UserContext);
  const { t } = useLanguage();

  const filteredLists = lists.filter(list =>
    list.owner === loggedInUser || list.memberList.includes(loggedInUser)
  );

  const itemCounts = lists.reduce((counts, list) => {
    counts[list.id] = list.itemList.length;
    return counts;
  }, {});

  return (
    <div className="flex flex-col border-2 border-green-500 dark:border-green-400 m-3 p-3 bg-white dark:bg-slate-800 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">{t('shoppingList')}</h2>
        <button
          onClick={() => setShowCreateList(true)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1 dark:bg-green-600 dark:hover:bg-green-700"
        >
          {t('newList')} +
        </button>
      </div>

      <div className="grid gap-2 mb-4">
      {filteredLists.map(list => (
          <div key={list.id} className="flex justify-between items-center">
            <button
              onClick={() => setActiveListId(list.id)}
              className={`flex-grow p-2 rounded text-left transition-colors ${
                list.id === activeListId
                  ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400'
                  : 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 dark:text-white'
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
                </div>
              </div>
            </button>
            {loggedInUser === list.owner && (
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => {
                    setActiveListId(list.id);
                    setShowUpdateName(true);
                  }}
                  className="px-3 py-1 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 text-sm flex items-center gap-1 dark:text-white"
                  aria-label={t('editList')}
                >
                  <span className="text-lg">✎</span>
                </button>
                <button
                  onClick={() => handlerMap.deleteList({ listId: list.id })}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-sm flex items-center gap-1"
                  aria-label={t('delete')}
                >
                  <span className="text-lg">🗑️</span>
                </button>
              </div>
            )}
          </div>
        ))}
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

export default Toolbar;