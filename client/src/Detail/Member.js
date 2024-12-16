// Member.jsx
const Member = ({ userData, listId, handlerMap, isOwner, canManage, loggedInUser }) => {
  return (
    <div className="flex gap-2 items-center justify-between p-2 bg-white rounded border">
      <div className="flex items-center gap-2">
        <span className="font-medium">{userData.name}</span>
        {isOwner && (
          <span className="text-sm text-gray-500">(Vlastník)</span>
        )}
      </div>

      {!isOwner && canManage && (
        <button
          onClick={() => handlerMap.removeMember({ 
            listId, 
            memberId: userData.id 
          })}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
        >
          Odebrat
          <span className="text-lg">×</span>
        </button>
      )}
    </div>
  );
};

export default Member;