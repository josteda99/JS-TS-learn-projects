import { use, useEffect, useRef, useState } from "react";
import "./App.css";
import type { User } from "./types";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=50")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = filterCountry
    ? users.filter((user) =>
        user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase()),
      )
    : users;

  const sortedUsers = sortByCountry
    ? filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country),
      )
    : filteredUsers;

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const resetState = () => {
    setUsers(originalUsers.current);
  };

  return (
    <div className="App">
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>Color table</button>
        <button onClick={toggleSortCountry}>
          {sortByCountry ? "No order by country " : "Order by Country"}
        </button>
        <button onClick={resetState}>Reset State</button>
        <input
          type="text"
          placeholder="country filter"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColors={showColors}
          handleDelete={handleDelete}
        ></UsersList>
      </main>
    </div>
  );
}

export default App;
