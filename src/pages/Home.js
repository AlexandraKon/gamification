import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import UserCard from "../components/UserCard";
import politico1 from "../Images/Politicos/politico1.jpg";
import politico2 from "../Images/Politicos/politico2.jpg";
// (Resto de las imágenes)

const imagesData = [
  politico1,
  politico2,
  // (Resto de las imágenes)
];

function Home() {
  const [newUser, setNewUser] = useState({ name: "", points: 0, señor: false });
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const sprintsCollectionRef = collection(db, "sprints");

  // Función para obtener los datos de Firestore
  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // useEffect con interval para refrescar los datos periódicamente
  useEffect(() => {
    fetchUsers(); // Obtén los datos inicialmente
    const interval = setInterval(fetchUsers, 5000); // Refresca cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const createUser = async () => {
    if (!newUser.name.trim()) {
      alert("Please enter a name for the user.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * imagesData.length);
    const randomImage = imagesData[randomIndex];
    await addDoc(usersCollectionRef, { ...newUser, points: Number(newUser.points), image: randomImage });
    setNewUser({ name: "", points: 0, señor: false });
    fetchUsers(); // Actualiza los datos inmediatamente
  };

  const updateUser = async (id, points) => {
    const pointsToAdd = parseInt(prompt("¿Cuántos puntos desea añadir?"), 10) || 0;
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { points: points + pointsToAdd });
    fetchUsers(); // Actualiza los datos inmediatamente
  };

  const deletePointsUser = async (id, points) => {
    const pointsToRemove = parseInt(prompt("¿Cuántos puntos desea eliminar?"), 10) || 0;
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { points: points - pointsToRemove });
    fetchUsers(); // Actualiza los datos inmediatamente
  };

  const deleteUser = async (id, userName) => {
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar a ${userName}?`);
    if (confirmDelete) {
      const password = prompt("Ingrese la contraseña para confirmar la eliminación:");
      if (password === "Salle23@") {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        fetchUsers(); // Actualiza los datos inmediatamente
        alert("Usuario eliminado correctamente.");
      } else {
        alert("Contraseña incorrecta. No se eliminó el usuario.");
      }
    }
  };

  const closeSprint = async () => {
    const enteredPassword = prompt("Enter password for closing sprint:");
    if (enteredPassword === "Salle23@") {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", { month: "long" });
      const currentYear = currentDate.getFullYear();
      users.forEach(async (user) => {
        const sprintDocRef = doc(sprintsCollectionRef, `${user.name}-${currentMonth}-${currentYear}`);
        await setDoc(sprintDocRef, { points: user.points });
      });
      alert("Sprint closed successfully. Data saved.");
    } else {
      alert("Incorrect password");
    }
  };

  const aristocrates = users.filter((user) => user.señor).sort((a, b) => b.points - a.points);
  const maquinas = users.filter((user) => !user.señor).sort((a, b) => b.points - a.points);

  const totalPointsAristocrates = aristocrates.reduce((acc, user) => acc + user.points, 0);
  const totalPointsMaquinas = maquinas.reduce((acc, user) => acc + user.points, 0);

  return (
    <>
      <div className="divCrear">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Points"
          value={newUser.points}
          onChange={(e) => setNewUser({ ...newUser, points: e.target.value })}
        />
        <label className="checkbox-label">
          Aristócrate:
          <input
            type="checkbox"
            checked={newUser.señor}
            onChange={(e) => setNewUser({ ...newUser, señor: e.target.checked })}
            className="styled-checkbox"
          />
        </label>
        <button className="btnCreate" onClick={createUser}>Create User</button>
        <button className="btnCreate" onClick={closeSprint}>Close Sprint</button>
      </div>

      <div className="container">
        <div className="column">
          <h1>Aristócrates</h1>
          <h2>Total points: {totalPointsAristocrates}</h2>
          {aristocrates.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              updateUser={updateUser}
              deletePointsUser={deletePointsUser}
              deleteUser={deleteUser}
            />
          ))}
        </div>

        <div className="column">
          <h1>Eres una máquina, ¿no?</h1>
          <h2>Total points: {totalPointsMaquinas}</h2>
          {maquinas.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              updateUser={updateUser}
              deletePointsUser={deletePointsUser}
              deleteUser={deleteUser}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
