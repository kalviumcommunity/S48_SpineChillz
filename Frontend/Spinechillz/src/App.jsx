import { Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import LandingPage from './LandingPage';

const App = () => {
  return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
  

  );
};

export default App;
