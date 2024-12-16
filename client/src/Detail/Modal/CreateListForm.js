// CreateListForm.jsx
import React from 'react';

const CreateListForm = ({ show, handleClose, handlerMap }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          handlerMap.createList({ name: values.name });
          handleClose();
        }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Nový nákupní seznam</h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Název seznamu</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border rounded"
              placeholder="Zadejte název seznamu"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Vytvořit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListForm;