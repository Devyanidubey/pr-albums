import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import history from './history';

function App() {

  const AlbumComponent = React.lazy(() => import('./Albums'));
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<AlbumComponent />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
