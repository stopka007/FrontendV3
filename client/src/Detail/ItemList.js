// ItemList.jsx
import { useContext } from "react";
import { DetailContext } from "./DetailProvider";
import Item from "./Item";

const ItemList = () => {
  const { lists, activeListId, handlerMap, showResolved, toggleShowResolved } = useContext(DetailContext);
 
  const activeList = lists.find(list => list.id === activeListId);
  if (!activeList) return null;

  // Filtrování položek podle showResolved
  const filteredItems = showResolved 
    ? activeList.itemList 
    : activeList.itemList.filter(item => !item.resolved);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr_3fr] border-2 border-green-500 m-3 p-3 min-h-[110px]">
      <div className="col-start-1 row-start-2 grid gap-2 h-20">
        <button
          onClick={() => handlerMap.addItem({ listId: activeListId })}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 max-w-[170px]"
        >
          Přidat položku
          <span className="text-lg">+</span>
        </button>
        <button
          onClick={() => toggleShowResolved()}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 max-w-[170px]"
        >
          {showResolved ? "Zobrazit nevyřízené" : "Zobrazit vše"}
        </button>
      </div>
      <div className="col-start-2 row-start-2 grid gap-2">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            data={item}
            listId={activeListId}
            handlerMap={handlerMap}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;