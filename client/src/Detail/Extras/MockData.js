import { v4 as uuidv4 } from 'uuid';

export const initialShoppingLists = [
  {
    id: "tdl01",
    name: "Nákupní seznam 1",
    owner: "u1",
    memberList: ["u2", "u3"],
    itemList: [
      {
        id: "td01",
        name: "Mléko",
        resolved: false,
      },
      {
        id: "td02",
        name: "Chléb",
        resolved: true,
      }
    ],
    archived: false,
  },
  {
    id: "tdl02",
    name: "Nákupní seznam 2",
    owner: "u1",
    memberList: ["u2"],
    itemList: [
      {
        id: "td03",
        name: "Jablka",
        resolved: false,
      }
    ],
    archived: false,
  }
];

export const createNewList = (name, owner) => {
  return {
    id: uuidv4(),
    name,
    owner,
    memberList: [],
    itemList: [],
    archived: false,
  };
};

export const createNewItem = (name = "") => {
  return {
    id: uuidv4(),
    name,
    resolved: false,
  };
};

export const saveListsToStorage = (lists) => {
  try {
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadListsFromStorage = () => {
  try {
    const saved = localStorage.getItem('shoppingLists');
    return saved ? JSON.parse(saved) : initialShoppingLists;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return initialShoppingLists;
  }
};

export const updateList = (lists, listId, updates) => {
  return lists.map(list =>
    list.id === listId ? { ...list, ...updates } : list
  );
};

export const deleteList = (lists, listId) => {
  return lists.filter(list => list.id !== listId);
};

export const addItemToList = (lists, listId, item) => {
  return lists.map(list =>
    list.id === listId
      ? {
          ...list,
          itemList: [...list.itemList, item]
        }
      : list
  );
};

export const updateItemInList = (lists, listId, itemId, updates) => {
  return lists.map(list =>
    list.id === listId
      ? {
          ...list,
          itemList: list.itemList.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        }
      : list
  );
};

export const deleteItemFromList = (lists, listId, itemId) => {
  return lists.map(list =>
    list.id === listId
      ? {
          ...list,
          itemList: list.itemList.filter(item => item.id !== itemId)
        }
      : list
  );
};