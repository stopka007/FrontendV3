import { useLanguage } from '../LanguageProvider';

function AddMemberForm({ show, userList, listId, handlerMap, handleClose }) {
  const { t } = useLanguage();
  
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-96 transition-colors duration-200">
        <h3 className="text-lg font-medium mb-4 dark:text-white">{t('addMember')}</h3>
        <div className="grid gap-2">
          {userList.map(user => (
            <button
              key={user.id}
              onClick={() => {
                handlerMap.addMember({ listId, memberId: user.id });
                handleClose();
              }}
              className="p-2 text-left rounded border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white"
            >
              {user.name}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 dark:text-white"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberForm;