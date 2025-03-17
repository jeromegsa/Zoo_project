import { useEffect, useState } from "react";
import api from "./api/axios";
import LoginPage from "./pages/login";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupérer le token stocké

    api.get("/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
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
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
