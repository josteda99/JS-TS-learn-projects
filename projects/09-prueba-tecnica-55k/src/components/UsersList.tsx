import type { User } from "../types";

interface Props {
  users: User[];
  showColors: boolean;
  handleDelete: (email: string) => void;
}

export function UsersList({ users, showColors, handleDelete }: Props) {
  const handleClick = (email: string) => handleDelete(email);

  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const bgColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? bgColor : "transparent";

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.large} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleClick(user.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
