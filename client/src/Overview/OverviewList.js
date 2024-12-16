
import OverviewItem from "./OverviewItem";

function OverviewList({ toDoListOverviewList, handleArchive, handleDelete }) {
  return (
    <div>
      {toDoListOverviewList.map((toDoList) => (
        <OverviewItem
          key={toDoList.id}
          toDoList={toDoList}
          handleArchive={handleArchive}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default OverviewList;