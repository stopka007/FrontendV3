import { useLanguage } from "./Extras/LanguageProvider";

function Member({ userData, listId, handlerMap, isOwner, canManage, readonly }) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 items-center justify-between p-2 bg-white dark:bg-slate-700 rounded border dark:border-slate-600 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <span className="font-medium dark:text-white">{userData.name}</span>
        {isOwner && (
          <span className="text-sm text-gray-500 dark:text-gray-400">({t('owner')})</span>
        )}
      </div>
      {!isOwner && canManage && !readonly && (
        <button
          onClick={() => handlerMap.removeMember({
            listId,
            memberId: userData.id
          })}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-sm flex items-center gap-1"
        >
          {t('delete')}
          <span className="text-lg">×</span>
        </button>
      )}
    </div>
  );
}

export default Member;