// OverviewProvider.js
import { useMemo, useState, useContext } from "react";
import { UserContext } from "../Users/UserProvider.js";
import Header from "./Header.js";
import ToDoListOverviewList from "./OverviewList.js";
import Toolbar from "./Toolbar.js";

function OverviewProvider() {
  const [showArchived, setShowArchived] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const [toDoListOverviewList, setToDoListOverviewList] = useState([
    {
      id: "td01",
      name: "První úkolovník",
      state: "active",
      owner: "u1",
      memberList: ["u2"],
    },
    {
      id: "td02",
      name: "Druhý úkolovník",
      state: "archived",
      owner: "u1",
      memberList: ["u2", "u3"],
    },
    {
      id: "td03",
      name: "Třetí úkolovník",
      state: "active",
      owner: "u3",
      memberList: [],
    },
    {
      id: "td04",
      name: "čtvrtý úkolovník",
      state: "archived",
      owner: "u2",
      memberList: ["u1"],
    },
  ]);

  function handleCreate() {
    setToDoListOverviewList((current) => {
      const newList = [...current];
      newList.push({
        id: Math.random().toString(),
        name: "Nový seznam",
        state: "active",
        owner: loggedInUser,
        memberList: [],
      });
      return newList;
    });
  }

  function handleArchive(dtoIn) {
    setToDoListOverviewList((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      const newList = [...current];
      newList[itemIndex] = { ...newList[itemIndex], state: "archived" };
      return newList;
    });
  }

  function handleDelete(dtoIn) {
    setToDoListOverviewList((current) => 
      current.filter(item => item.id !== dtoIn.id)
    );
  }

  const filteredToDoListList = useMemo(() => {
    if (showArchived) {
      return toDoListOverviewList.filter(
        (item) =>
          item.owner === loggedInUser || item.memberList?.includes(loggedInUser)
      );
    } else {
      return toDoListOverviewList.filter(
        (item) =>
          item.state === "active" &&
          (item.owner === loggedInUser ||
            item.memberList?.includes(loggedInUser))
      );
    }
  }, [showArchived, toDoListOverviewList, loggedInUser]);

  return (
    <div className="relative h-screen">
      <Header />
      <Toolbar
        handleCreate={handleCreate}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />
      <ToDoListOverviewList
        toDoListOverviewList={filteredToDoListList}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
      />
      
      <button
        onClick={handleCreate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <span className="text-2xl font-bold leading-none">+</span>
        <span className={`transition-all duration-200 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
          Nový seznam
        </span>
      </button>
    </div>
  );
}

export default OverviewProvider;