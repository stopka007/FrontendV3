import Header from './Header';
import Toolbar from './Toolbar';
import ItemList from './ItemList';
import MemberList from './MemberList';
import DetailProvider from './DetailProvider';

function Detail() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] gap-0 bg-white dark:bg-slate-900 transition-colors duration-200">
      <DetailProvider>
        <Header />
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 p-4">
          <div className="border-2 border-green-500 dark:border-green-400">
            <Toolbar />
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