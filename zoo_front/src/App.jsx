import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupérer le token stocké

    api.get("/users/", {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NDEyODM0Njl9.UgemZloFfX8QfZ_wk2alUsoAEQBbk0-44wE2mOfbBIY`,
      },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nom} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
