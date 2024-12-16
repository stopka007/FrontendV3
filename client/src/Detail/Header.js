import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.js";

const Header = () => {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  
  return (
    <div className="flex justify-between items-center p-4 border-2 border-green-500 mb-3 bg-blue-100">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <div className="grid gap-1 justify-items-end">
        {userList.map((user) => (
          <button
            key={user.id}
            onClick={() => setLoggedInUser(user.id)}
            className={`px-3 py-1 rounded border ${
              user.id === loggedInUser 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-black'
            }`}
          >
            {user.name} {user.id === loggedInUser ? "(Logged In)" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Header;
