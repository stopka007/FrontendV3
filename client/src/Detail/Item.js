import { useState } from "react";
import { useLanguage } from "./Extras/LanguageProvider";

function Item({ data, listId, handlerMap, readonly }) {
  const [value, setValue] = useState(data.name);
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm border-2 border-gray-400 dark:border-slate-600">
      <input
        type="text"
        value={value}
        className="flex-1 p-2 rounded border-2 border-gray-400 dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => !readonly && handlerMap.updateItemName({ listId, itemId: data.id, name: value })}
        readOnly={readonly}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.resolved}
          onChange={() => !readonly && handlerMap.toggleResolveItem({ listId, itemId: data.id })}
          className="w-5 h-5 text-green-600 rounded border-2 border-gray-400 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700"
          readOnly={readonly}
        />
       
        {!readonly && (
          <button
            onClick={() => handlerMap.deleteItem({ listId, itemId: data.id })}
            className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label={t('delete')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Item;