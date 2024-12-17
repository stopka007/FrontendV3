import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    shoppingList: "Shopping List",
    addItem: "Add Item",
    showAll: "Show All",
    showUnresolved: "Show Unresolved",
    resolve: "Resolve",
    undoResolve: "Undo Resolve",
    delete: "Delete",
    newList: "New List",
    editList: "Edit List",
    members: "List Members",
    addMember: "Add Member",
    owner: "Owner",
    member: "Member",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    close: "Close",
    loggedIn: "Logged In",
    listName: "List name",
    taskProgress: "Task Progress",
    resolved: "Resolved",
    unresolved: "Unresolved",
    total: "Total",
    complete: "Complete",
    showChart: "Show Chart",
    hideChart: "Hide Chart",
    item_one: 'Item',
    item_few: 'Items',
    item_many: 'Items',
  },
  cs: {
    shoppingList: "Nákupní seznam",
    addItem: "Přidat položku",
    showAll: "Zobrazit vše",
    showUnresolved: "Zobrazit nevyřízené",
    resolve: "Vyřídit",
    undoResolve: "Zrušit vyřízení",
    delete: "Smazat",
    newList: "Nový seznam",
    editList: "Upravit seznam",
    members: "Členové seznamu",
    addMember: "Přidat člena",
    owner: "Vlastník",
    member: "Člen",
    cancel: "Zrušit",
    save: "Uložit",
    create: "Vytvořit",
    close: "Zavřít",
    loggedIn: "Přihlášen",
    listName: "Název seznamu",
    taskProgress: "Přehled úkolů",
    resolved: "Vyřízené",
    unresolved: "Nevyřízené",
    total: "Celkem",
    complete: "Hotovo",
    showChart: "Zobrazit graf",
    hideChart: "Skrýt graf",
    item_one: 'Položka',
    item_few: 'Položky',
    item_many: 'Položek',
  },
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'cs';
  });

  const toggleLanguage = () => {
    const newLang = language === 'cs' ? 'en' : 'cs';
    localStorage.setItem('language', newLang);
    setLanguage(newLang);
  };

  const t = (key, count) => {
    if (count !== undefined) {
      if (count === 1) {
        return translations[language][`${key}_one`];
      } else if (count >= 2 && count <= 4) {
        return translations[language][`${key}_few`];
      } else {
        return translations[language][`${key}_many`];
      }
    }
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider;