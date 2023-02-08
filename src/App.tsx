import './App.scss';

import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';
import SingleAnime from './components/Pages/SingleAnime/SingleAnime';
import Anime from './components/Pages/Anime/Anime';
import Search from './components/Pages/Search/Search';

const Authorization = React.lazy(() => import('./components/lazyLoadedPages/Authorization/Authorization'));
const Profile = React.lazy(() => import('./components/lazyLoadedPages/Profile/Profile'));

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
