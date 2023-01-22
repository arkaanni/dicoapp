import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import Header from './component/Header';
import CreateThread from './page/CreateThread';
import Home from './page/Home';
import Leaderboard from './page/Leaderboard';
import Login from './page/Login';
import Register from './page/Register';
import ThreadDetail from './page/ThreadDetail';
import { preloadState } from './redux/preload/action';
import { logoutUser } from './redux/user/action';

function App() {
  const dispatch = useDispatch();
  const { message, user, isPreload } = useSelector((state) => state);

  useEffect(() => {
    dispatch(preloadState());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="mx-auto h-screen w-full pb-10">
      <div className="sticky top-0 z-50">
        <Header user={user} onLogout={handleLogout} />
      </div>
      <div>
        <LoadingBar style={{ backgroundColor: 'green' }} showFastActions />
      </div>
      <div className="p-4">
        {message != null && (
          <div className="alert bg-primary w-fit m-4 fixed z-50 bottom-0 right-0">
            <p>{message.text}</p>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thread/:id" element={<ThreadDetail />} />
          <Route path="/thread/new" element={<CreateThread />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
