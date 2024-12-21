import Header from './Header';
import ShoppingLists from './ShoppingLists';
import ItemList from './ItemList';
import MemberList from './MemberList';
import DetailProvider from './DetailProvider';
import { useLocation } from 'react-router-dom';

function Detail() {
  const location = useLocation();
  const isShoppingListsRoute = location.pathname === '/shoppingLists';
  const isMemberView = location.pathname === '/member';

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] gap-0 bg-white dark:bg-slate-800 transition-colors duration-200">
      <DetailProvider>
        <div>
          <Header />
          <div className="border-b border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="grid md:grid-cols-[1.5fr_3.5fr] lg:grid-cols-[1.5fr_3.5fr_1fr] gap-4 p-4">
          <div className={`${(!isShoppingListsRoute || isMemberView) ? 'hidden md:block' : ''} border-r border-gray-200 dark:border-gray-700`}>
            <ShoppingLists />
          </div>
          <div className={`
            ${isShoppingListsRoute ? 'hidden md:block' : ''}
            ${isMemberView ? 'md:border-l' : 'border-r'}
            border-gray-200 dark:border-gray-700
          `}>
            {!isShoppingListsRoute && !isMemberView && <ItemList />}
            {isMemberView && <MemberList />}
          </div>
          <div className="hidden lg:block">
            {!isShoppingListsRoute && !isMemberView && <MemberList />}
          </div>
        </div>
      </DetailProvider>
    </div>
  );
}

export default Detail;