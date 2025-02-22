import React, { createContext, useMemo, useState, useContext, useEffect } from 'react';
import { UserContext } from "../Users/UserProvider.js";
import {
  loadListsFromStorage,
  saveListsToStorage,
  createNewList,
  createNewItem,
  updateList,
  addItemToList,
  updateItemInList,
  deleteItemFromList
} from './Extras/MockData.js';

export const DetailContext = createContext();

const DetailProvider = ({ children }) => {
  const { loggedInUser } = useContext(UserContext);
  const [lists, setLists] = useState(() => loadListsFromStorage());
  const [activeListId, setActiveListId] = useState(lists[0]?.id || null);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    saveListsToStorage(lists);
  }, [lists]);

  const activeList = lists.find(list => list.id === activeListId);

  const filteredData = useMemo(() => {
    if (!activeList) return null;
    const result = { ...activeList };
    if (!showResolved) {
      result.itemList = result.itemList.filter((item) => !item.resolved);
    }
    return result;
  }, [activeList, showResolved]);

  const value = {
    lists,
    activeListId,
    setActiveListId,
    data: filteredData,
    
    handlerMap: {
      updateName: ({ id, name }) => {
        setLists(current => updateList(current, id, { name }));
      },
      updateList: ({ listId, updates }) => {
        setLists(current => updateList(current, listId, updates));
      },
      createList: ({ name }) => {
        const newList = createNewList(name, loggedInUser);
        setLists(current => [...current, newList]);
        setActiveListId(newList.id);
      },
      addItem: ({ listId }) => {
        const newItem = createNewItem();
        setLists(current => addItemToList(current, listId, newItem));
      },
      updateItemName: ({ listId, itemId, name }) => {
        setLists(current => updateItemInList(current, listId, itemId, { name }));
      },
      toggleResolveItem: ({ listId, itemId }) => {
        setLists(current => {
          const list = current.find(l => l.id === listId);
          const item = list?.itemList.find(i => i.id === itemId);
          if (!item) return current;
          return updateItemInList(current, listId, itemId, { resolved: !item.resolved });
        });
      },
      deleteItem: ({ listId, itemId }) => {
        setLists(current => deleteItemFromList(current, listId, itemId));
      },
      addMember: ({ listId, memberId }) => {
        setLists(current => {
          const list = current.find(l => l.id === listId);
          if (!list || list.memberList.includes(memberId)) return current;
          return updateList(current, listId, {
            memberList: [...list.memberList, memberId]
          });
        });
      },
      removeMember: ({ listId, memberId }) => {
        setLists(current => {
          const list = current.find(l => l.id === listId);
          if (!list) return current;
          return updateList(current, listId, {
            memberList: list.memberList.filter(id => id !== memberId)
          });
        });
      },
      deleteList: ({ listId }) => {
        setLists(current => {
          const newLists = current.filter(list => list.id !== listId);
          if (listId === activeListId) {
            setActiveListId(newLists.length > 0 ? newLists[0].id : null);
          }
          return newLists;
        });
      },
    },
    showResolved,
    toggleShowResolved: () => setShowResolved(prev => !prev),
  };

  return (
    <DetailContext.Provider value={value}>{children}</DetailContext.Provider>
  );
};

export default DetailProvider;