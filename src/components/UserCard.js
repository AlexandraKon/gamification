// src/components/UserCard.js
import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importar el icono de eliminar

function UserCard({ user, updateUser, deletePointsUser, deleteUser }) {
  return (
    <div className="userMember">
      <div className="divMember">
        {user.image && (
          <div className="member">
            <img src={user.image} alt={`${user.name}'s profile`} />
          </div>
        )}
        <div>
          <h2>{user.name}</h2>
          <h3>Points: {user.points}</h3>
        </div>
      </div>
      <button onClick={() => updateUser(user.id, user.points)}>+</button>
      <button onClick={() => deletePointsUser(user.id, user.points)}>-</button>
      <button onClick={() => deleteUser(user.id, user.name)} className="deleteButton">
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default UserCard;
