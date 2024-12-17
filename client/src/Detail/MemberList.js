import { useContext, useState } from "react";
import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import { useLanguage } from "./LanguageProvider";
import AddMemberForm from "./Modal/AddMemberForm";
import Member from "./Member";

function MemberList() {
  const { lists, activeListId, handlerMap } = useContext(DetailContext);
  const { userMap, userList, loggedInUser } = useContext(UserContext);
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  const activeList = lists.find(list => list.id === activeListId);
  if (!activeList) return null;

  return (
    <div className="p-4 bg-white dark:bg-slate-800 transition-colors duration-200 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium dark:text-white">{t('members')}</span>
          {activeList.owner === loggedInUser && (
            <button
              onClick={() => setShow(true)}
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              {t('addMember')} +
            </button>
          )}
        </div>
        <Member
          key={activeList.owner}
          userData={userMap[activeList.owner]}
          listId={activeListId}
          handlerMap={handlerMap}
          isOwner={true}
          canManage={false}
          loggedInUser={loggedInUser}
        />

        {activeList.memberList.map((memberId) => (
          <Member
            key={memberId}
            userData={userMap[memberId]}
            listId={activeListId}
            handlerMap={handlerMap}
            isOwner={false}
            canManage={loggedInUser === activeList.owner || memberId === loggedInUser}
            loggedInUser={loggedInUser}
          />
        ))}
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
}

export default MemberList;