import './index.css'
import Home from './components/Home';
import Edit from './components/Edit';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
