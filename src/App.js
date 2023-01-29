import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import history from './history';

function App() {

  const AlbumComponent = React.lazy(() => import('./Albums'));
  const PhotoComponent = React.lazy(() => import('./Photos'));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<AlbumComponent />} />
          <Route path='/album/photos' element={<PhotoComponent />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
