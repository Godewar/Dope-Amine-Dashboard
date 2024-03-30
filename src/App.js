import './App.css';
import Nav from "./Components/Nav";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
// import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
import Profile from './Components/Profile';
 import SignUp from './Components/Signup';
import DeleteProduct from './Components/DeleteProduct';
import CustomerList from './Components/CustomerList';
import MyOrderList from './Components/MyOrderList';
// import ProductDetail from './Components/ProductDetail';


function App() {
  return (
    <div className="App">
      <title>DopeAmine Dashboard</title>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Proctected Routes for LoggedIn User */}
          <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} /> 
             {/* <Route path="/" element={<ProductDetail/>} /> */}
             
             <Route path="/customer" element={<CustomerList/>} /> 
             <Route path="/add" element={<AddProduct />} /> 
             <Route path="/allneworder" element={<MyOrderList/>} /> 
             <Route path="/update/:id" element={<UpdateProduct/>} />
             <Route path="/delete/:id" element={<DeleteProduct/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
          </Route>

          {/* Unprotected Routes for Anonymous User */}
           <Route path="/signup" element={<SignUp/>} /> 
          <Route path="/login" element={<Login/>} /> */
          

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
