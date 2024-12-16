import React, { useContext, useState } from "react";
import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import UpdateNameForm from "./Modal/UpdateNameForm";
import CreateListForm from "./Modal/CreateListForm";

const Toolbar = () => {
 const [showUpdateName, setShowUpdateName] = useState(false);
 const [showCreateList, setShowCreateList] = useState(false);
 const { data, lists, activeListId, setActiveListId, handlerMap } = useContext(DetailContext);
 const { loggedInUser } = useContext(UserContext);

 const filteredLists = lists.filter(list => 
   list.owner === loggedInUser || list.memberList.includes(loggedInUser)
 );

 return (
   <div className="flex flex-col border-2 border-green-500 m-3 p-3">
     <div className="flex justify-between items-center mb-4">
       <h2 className="text-xl font-bold">Nákupní seznamy</h2>
       <button
         onClick={() => setShowCreateList(true)}
         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1"
       >
         Nový seznam +
       </button>
     </div>
    
     <div className="grid gap-2 mb-4">
       {filteredLists.map(list => (
         <div key={list.id} className="flex justify-between items-center">
           <button
             onClick={() => setActiveListId(list.id)}
             className={`flex-grow p-2 rounded text-left ${
               list.id === activeListId
                 ? 'bg-green-100 border-2 border-green-500'
                 : 'bg-gray-50 hover:bg-gray-100'
             }`}
           >
             <div className="flex items-center justify-between">
               <span>{list.name}</span>
               <span className="text-sm text-gray-500">
                 {list.owner === loggedInUser ? '(Vlastník)' : '(Člen)'}
               </span>
             </div>
           </button>
           {loggedInUser === list.owner && (
             <div className="flex gap-1 ml-2">
               <button
                 onClick={() => {
                   setActiveListId(list.id);
                   setShowUpdateName(true);
                 }}
                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm flex items-center gap-1"
               >
                 <span className="text-lg">✎</span>
               </button>
               <button
                 onClick={() => handlerMap.deleteList({ listId: list.id })}
                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
               >
                 <span className="text-lg">🗑️</span>
               </button>
             </div>
           )}
         </div>
       ))}
     </div>

     <UpdateNameForm
       show={showUpdateName}
       handleClose={() => setShowUpdateName(false)}
       data={data}
       handlerMap={handlerMap}
     />
     <CreateListForm
       show={showCreateList}
       handleClose={() => setShowCreateList(false)}
       handlerMap={handlerMap}
     />
   </div>
 );
};

export default Toolbar;