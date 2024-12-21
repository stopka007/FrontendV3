import React from 'react';
import Header from './Header';

function Home() {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-slate-800 transition-colors duration-200">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <p className="text-xl text-gray-800 dark:text-gray-200">Pro zobrazení nákupních seznamů se přihlaste</p>
      </div>
    </div>
  );
}

export default Home;