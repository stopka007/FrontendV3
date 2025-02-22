import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import { useLanguage } from "./Extras/LanguageProvider";
import AddMemberForm from "./Modal/AddMemberForm";
import Member from "./Member";

function MemberList() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMemberPage = location.pathname === '/member';
  const isShoppingListsPage = location.pathname === '/shoppingLists';
 
  const { lists, activeListId, handlerMap } = useContext(DetailContext);
  const { userMap, userList, loggedInUser } = useContext(UserContext);
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  const activeList = lists.find(list => list.id === activeListId);
  if (!activeList || isShoppingListsPage) return null;
  const isArchived = activeList.archived;
  if (!activeList) return null;

  const content = (
    <div className="p-3 flex flex-col h-full">
      <h2 className="text-xl font-bold dark:text-white mb-3">{t('members')}</h2>
      
      <div className="flex gap-2 mb-4 justify-center">
      {!isArchived && activeList.owner === loggedInUser && (
          <button
            onClick={() => setShow(true)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1 dark:bg-green-600 dark:hover:bg-green-700"
          >
            {t('addMember')} +
          </button>
        )}
      </div>

      <div 
        className="overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" 
        style={{ maxHeight: "calc(100vh - 16rem)" }}
      >
        <div className="grid gap-2">
        <Member
            key={activeList.owner}
            userData={userMap[activeList.owner]}
            listId={activeListId}
            handlerMap={handlerMap}
            isOwner={true}
            canManage={false}
            loggedInUser={loggedInUser}
            readonly={isArchived}
          />
          {activeList.memberList.map((memberId) => (
            <Member
              key={memberId}
              userData={userMap[memberId]}
              listId={activeListId}
              handlerMap={handlerMap}
              isOwner={false}
              canManage={
                !isArchived && 
                (loggedInUser === activeList.owner || memberId === loggedInUser)
              }
              loggedInUser={loggedInUser}
              readonly={isArchived}
            />
          ))}
        </div>
      </div>

      <AddMemberForm
        show={show}
        userList={userList.filter(user =>
          user.id !== activeList.owner &&
          !activeList.memberList.includes(user.id)
        )}
        listId={activeListId}
        handlerMap={handlerMap}
        handleClose={() => setShow(false)}
      />
    </div>
  );

  if (isMemberPage) {
    return (
      <div className="h-screen grid grid-rows-[auto_1fr] gap-0 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="p-4">
          <button
            onClick={() => navigate('/detail')}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('backToItems')}
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
}

export default MemberList;