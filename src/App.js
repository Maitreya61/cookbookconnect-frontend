import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Saved from './pages/Saved';
import Login from './pages/Login';
import Register from './pages/Register';


const router = createBrowserRouter([{
  path:"/",
  element:<Navbar/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>,
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/saved",
      element:<Saved/>
    },
  ]
}])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
