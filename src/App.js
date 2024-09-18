import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoutes from './AppRoutes';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </div>
  );
}

export default App;
