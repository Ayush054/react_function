import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('userDetails');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
