import Header from './Header';
import ShoppingLists from './ShoppingLists';
import ItemList from './ItemList';
import MemberList from './MemberList';
import DetailProvider from './DetailProvider';

function Detail() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] gap-0 bg-white dark:bg-slate-900 transition-colors duration-200">
      <DetailProvider>
        <Header />
        <div className="grid grid-cols-[2fr_3fr_2fr] gap-4 p-4">
          <div className="border-2 border-green-500 dark:border-green-400">
            <ShoppingLists />
          </div>
          <div className="border-2 border-green-500 dark:border-green-400">
            <ItemList />
          </div>
          <div className="border-2 border-green-500 dark:border-green-400">
            <MemberList />
          </div>
        </div>
      </DetailProvider>
    </div>
  );
}

export default Detail;