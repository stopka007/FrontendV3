import { useState } from "react";

const Item = ({ data, listId, handlerMap }) => {
  const [value, setValue] = useState(data.name);
 
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        className="flex-grow p-2 border rounded"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => handlerMap.updateItemName({ listId, itemId: data.id, name: value })}
      />
      <button
        onClick={() => handlerMap.toggleResolveItem({ listId, itemId: data.id })}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-500 text-sm flex items-center gap-1"
      >
        {data.resolved ? "Zrušit vyřízení" : "Vyřídit"}
      </button>
      <button
        onClick={() => handlerMap.deleteItem({ listId, itemId: data.id })}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
      >
        Smazat
      </button>
    </div>
  );
};

export default Item;
