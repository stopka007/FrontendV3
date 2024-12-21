import { useState } from 'react';
import { useLanguage } from '../Extras/LanguageProvider';

function CreateListForm({ show, handleClose, handlerMap }) {
  const [value, setValue] = useState('');
  const { t } = useLanguage();

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerMap.createList({ name: value });
    setValue('');
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-96 transition-colors duration-200">
        <h3 className="text-lg font-medium mb-4 dark:text-white">{t('newList')}</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={t('listName')}
            className="p-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 dark:bg-slate-600 rounded hover:bg-gray-300 dark:hover:bg-slate-500 dark:text-white"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              {t('create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListForm;