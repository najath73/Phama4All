import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api'; // Importer ton instance Axios
import { AuthorizationError } from '../utils/errors'; // Import de l'erreur personnalisée
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger le token et les informations utilisateur depuis le localStorage au démarrage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token); // Récupérer les informations utilisateur
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await api.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser({ token, ...response.data });
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur:", error);
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {

      const response = await api.post('auth/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, role } = response.data;


      if(role !== "simple_user"){
        throw new AuthorizationError("Accès refusé : l'utilisateur n'a pas la permission.");
      }
      
      // Enregistrer le token dans le localStorage
      localStorage.setItem('token', access_token);
      setUser({ token: access_token });

      // Récupérer les informations utilisateur après la connexion
      fetchUserInfo(access_token);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Mot de passe incorrect. Veuillez vérifier vos informations.');
      } else if (error instanceof AuthorizationError){
        throw error
      } else {
        throw new Error('Erreur lors de la connexion. Veuillez vérifier vos informations.');
      }
    }
  };

  const logout = () => {
    // Supprimer le token et les informations utilisateur du localStorage
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);