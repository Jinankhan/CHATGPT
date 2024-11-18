import './App.css';
import HomePage from './pages/HomePage';

import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useContext, useEffect } from 'react';
import { chatContext } from './context';
import ConversationPage from './pages/ChatPage';
const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUser } = useContext(chatContext);
  const saveUser = useCallback(() => {
    setUser({
      name: user?.name ?? '',
      profile: user?.picture ?? '',
      isLoggedIn: true
    });

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: user?.name,
        profile: user?.picture,
        isLoggedIn: true
      })
    );
  }, [user, setUser]);

  useEffect(() => {
    if (isAuthenticated) {
      saveUser();
    }
  }, [isAuthenticated, saveUser, user]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ConversationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
