import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import HomePage from './pages/HomePage';
import AddAccountPage from './pages/AddAccountPage';
import AddAccountManuallyPage from './pages/AddAccountManuallyPage';
import NewThemePage from './pages/NewThemePage';
import AboutPage from './pages/AboutPage';
import EditAccountPage from './pages/EditAccountPage';
import SetupPasswordPage from './pages/SetupPasswordPage';
import UnlockPage from './pages/UnlockPage';
import SettingsPage from './pages/SettingsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import WelcomeGuide from './components/WelcomeGuide';

export const AccountsContext = createContext();

const App = () => {
  const [accounts, setAccounts] = useState(() => {
    try {
      const savedAccounts = localStorage.getItem('accounts');
      return savedAccounts ? JSON.parse(savedAccounts) : [];
    } catch (error) {
      console.error("Failed to parse accounts from localStorage", error);
      return [];
    }
  });
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? JSON.parse(savedTheme) : darkTheme;
    } catch (error) {
      console.error("Failed to parse theme from localStorage", error);
      return darkTheme;
    }
  });
  const [password, setPassword] = useState(localStorage.getItem('app_password'));
  const [isLocked, setIsLocked] = useState(() => {
    const passwordExists = !!localStorage.getItem('app_password');
    const passwordDisabled = localStorage.getItem('password_disabled') === 'true';
    return passwordExists && !passwordDisabled;
  });
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('has_seen_welcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const addAccount = (account) => {
    setAccounts(prevAccounts => [...prevAccounts, { ...account, id: Date.now() }]);
  };

  const updateAccount = (updatedAccount) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === updatedAccount.id ? updatedAccount : account
      )
    );
  };

  const deleteAccount = (accountId) => {
    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
  };

  const handleSetPassword = (newPassword) => {
    localStorage.setItem('app_password', newPassword);
    localStorage.removeItem('password_disabled');
    setPassword(newPassword);
    setIsLocked(false);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('has_seen_welcome', 'true');
  };

  if (!password) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="*" element={<SetupPasswordPage setPassword={handleSetPassword} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  if (isLocked) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="*" element={<UnlockPage onUnlock={handleUnlock} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {showWelcome && <WelcomeGuide onClose={handleCloseWelcome} />}
      <AccountsContext.Provider value={{ accounts, setAccounts, addAccount, updateAccount, deleteAccount }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-account" element={<AddAccountPage />} />
            <Route path="/add-account-manually" element={<AddAccountManuallyPage />} />
            <Route path="/edit-account/:id" element={<EditAccountPage />} />
            <Route path="/theme" element={<NewThemePage setTheme={setTheme} currentTheme={theme} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Routes>
        </Router>
      </AccountsContext.Provider>
    </ThemeProvider>
  );
};

export default App;