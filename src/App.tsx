import './App.scss';

import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./shared/components/Header/Header";
import Footer from './shared/components/Footer/Footer';
import Home from './modules/main/Home/Home';
import SingleAnime from './modules/main/SingleAnime/SingleAnime';
import Anime from './modules/main/Anime/Anime';
import Search from './modules/main/Search/Search';

const Authorization = React.lazy(() => import('./modules/auth/Authorization/Authorization'));
const Profile = React.lazy(() => import('./modules/auth/Profile/Profile'));

function App() {
  return (
    <>
      <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<SingleAnime />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/search" element={<Search />} />
            <Route path="/auth" element={
              <React.Suspense fallback={<></>}>
                <Authorization />
              </React.Suspense>
            } />
            <Route path="/profile" element={
              <React.Suspense fallback={<></>}>
                <Profile />
              </React.Suspense>
            } />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
