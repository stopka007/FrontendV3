import { useState, useEffect } from 'react';
import { useLanguage } from '../Extras/LanguageProvider';

function UpdateNameForm({ show, handleClose, data, handlerMap }) {
  const [value, setValue] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    if (show && data) {
      setValue(data.name);
    }
  }, [show, data]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerMap.updateName({ id: data.id, name: value });
    handleClose();
  };

  const handleDelete = () => {
    handlerMap.deleteList({ listId: data.id });
    handleClose();
  };

  const handleArchiveOrActivate = () => {
    handlerMap.updateList({ listId: data.id, updates: { archived: !data.archived } });
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-lg transition-colors duration-200">
        <h3 className="text-xl font-medium mb-6 dark:text-white">{t('editList')}</h3>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="mb-4">
            <label className="block text-base text-gray-600 dark:text-gray-400 mb-2">{t('name')}</label>
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="w-full p-3 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />
          </div>
         
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleArchiveOrActivate}
                className="px-5 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
              >
                {data.archived ? t('Set Active') : t('Archive')}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-3 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                {t('delete')}
              </button>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              >
                {t('save')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-3 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 dark:text-white"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNameForm;