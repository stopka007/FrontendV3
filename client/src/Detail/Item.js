import { useState } from "react";
import { useLanguage } from "./Extras/LanguageProvider";

function Item({ data, listId, handlerMap }) {
  const [value, setValue] = useState(data.name);
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        className="flex-grow p-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => handlerMap.updateItemName({ listId, itemId: data.id, name: value })}
      />
      <button
        onClick={() => handlerMap.toggleResolveItem({ listId, itemId: data.id })}
        className="px-3 py-1 bg-gray-300 dark:bg-slate-600 rounded hover:bg-gray-500 dark:hover:bg-slate-500 text-sm flex items-center gap-1 dark:text-white"
      >
        {data.resolved ? t('undoResolve') : t('resolve')}
      </button>
      <button
        onClick={() => handlerMap.deleteItem({ listId, itemId: data.id })}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-sm flex items-center gap-1"
      >
        {t('delete')}
      </button>
    </div>
  );
}

export default Item;