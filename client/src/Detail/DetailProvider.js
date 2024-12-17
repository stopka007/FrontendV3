import React, { createContext, useMemo, useState, useContext } from 'react';
import { UserContext } from "../Users/UserProvider.js";

export const DetailContext = createContext();

const DetailProvider = ({ children }) => {
  const { loggedInUser } = useContext(UserContext);
  const [lists, setLists] = useState([
    {
      id: "tdl01",
      name: "Nákupní seznam 1",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [
        {
          id: "td01",
          name: "Položka 1",
          resolved: false,
        },
      ],
    }
  ]);
  const [activeListId, setActiveListId] = useState("tdl01");
  const [showResolved, setShowResolved] = useState(false);

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
        setLists(current => 
          current.map(list => 
            list.id === id 
              ? { ...list, name }
              : list
          )
        );
      },
      createList: ({ name }) => {
        const newList = {
          id: Math.random().toString(),
          name: name,
          owner: loggedInUser,
          memberList: [],
          itemList: [],
        };
        setLists(current => [...current, newList]);
        setActiveListId(newList.id);
      },
      addItem: ({ listId }) => {
        setLists(current => current.map(list => 
          list.id === listId 
            ? {
                ...list,
                itemList: [
                  ...list.itemList,
                  { id: Math.random().toString(), name: "", resolved: false }
                ]
              }
            : list
        ));
      },
      updateItemName: ({ listId, itemId, name }) => {
        setLists(current => current.map(list =>
          list.id === listId
            ? {
                ...list,
                itemList: list.itemList.map(item =>
                  item.id === itemId ? { ...item, name } : item
                )
              }
            : list
        ));
      },
      toggleResolveItem: ({ listId, itemId }) => {
        setLists(current => current.map(list =>
          list.id === listId
            ? {
                ...list,
                itemList: list.itemList.map(item =>
                  item.id === itemId ? { ...item, resolved: !item.resolved } : item
                )
              }
            : list
        ));
      },
      deleteItem: ({ listId, itemId }) => {
        setLists(current => current.map(list =>
          list.id === listId
            ? {
                ...list,
                itemList: list.itemList.filter(item => item.id !== itemId)
              }
            : list
        ));
      },
      addMember: ({ listId, memberId }) => {
        setLists(current => current.map(list => 
          list.id === listId
            ? {
                ...list,
                memberList: list.memberList.includes(memberId)
                  ? list.memberList
                  : [...list.memberList, memberId]
              }
            : list
        ));
      },
      removeMember: ({ listId, memberId }) => {
        setLists(current => current.map(list =>
          list.id === listId
            ? {
                ...list,
                memberList: list.memberList.filter(id => id !== memberId)
              }
            : list
        ));
      },
      deleteList: ({ listId }) => {
        setLists(lists => {
          const newLists = lists.filter(list => list.id !== listId);
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