// mockData.js
import { v4 as uuidv4 } from 'uuid'; // Doporučuji přidat UUID pro generování ID

// Výchozí mock data pro nákupní seznamy
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
  }
];

// Pomocné funkce pro práci s daty

export const createNewList = (name, owner) => {
  return {
    id: uuidv4(), // Generování unikátního ID
    name,
    owner,
    memberList: [],
    itemList: [],
  };
};

export const createNewItem = (name = "") => {
  return {
    id: uuidv4(),
    name,
    resolved: false,
  };
};

// Funkce pro uložení dat do localStorage
export const saveListsToStorage = (lists) => {
  try {
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Funkce pro načtení dat z localStorage
export const loadListsFromStorage = () => {
  try {
    const saved = localStorage.getItem('shoppingLists');
    return saved ? JSON.parse(saved) : initialShoppingLists;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return initialShoppingLists;
  }
};

// Funkce pro správu dat
export const updateList = (lists, listId, updates) => {
  return lists.map(list => 
    list.id === listId ? { ...list, ...updates } : list
  );
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