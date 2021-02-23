import logo from "./logo.svg";
import Dash from "./Components/Dash";
import Login from "./Components/Login";
import Register from "./Components/Register";
import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Route, NavLink, useHistory } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute";

// Doesn't seem that you can write this inline
// const PrivateRoute = ({ component: Component, ...rest }) => {
//    console.log(Component);
//    return (
//       <Route
//          {...rest}
//          render={(props) => {
//             localStorage.getItem("token") ? (
//                //  <Component {...props} />
//                <Component> WTF </Component>
//             ) : (
//                <Redirect to="/login" />
//             );
//          }}
//       />
//    );
// };

function App() {
   const history = useHistory();
   const [friends, setFriends] = useState([]);

   return (
      <div className="App">
         <Box
            height="5vh"
            display="flex"
            justifyContent="flex-end"
            alignSelf="flex-end"
         >
            <nav style={{ display: "flex", marginTop: "1vh" }}>
               <NavLink to="/">
                  <Box className="navitem">Home</Box>
               </NavLink>
               <NavLink to="/friends">
                  <Box className="navitem">Friends</Box>
               </NavLink>
               <NavLink to="/login">
                  <Box className="navitem">Login</Box>
               </NavLink>
               <NavLink to="/register">
                  <Box className="navitem">Register</Box>
               </NavLink>
               <a
                  onClick={() => {
                     localStorage.setItem("token", "");
                     history.push("/");
                  }}
                  href="?"
               >
                  <Box className="navitem">Logout</Box>
               </a>
            </nav>
         </Box>

         <PrivateRoute
            path="/friends"
            component={Dash}
            componentProps={{ friends, setFriends }}
         ></PrivateRoute>

         <Route exact path="/">
            <Box
               fontSize="3xl"
               marginTop="3vh"
               //  alignSelf="flex-start"
            >
               Friends App
            </Box>

            <Box
               fontSize="xl"
               marginTop="1vh"
               //  alignSelf="flex-start"
            >
               {localStorage.getItem("token").length > 0 ? (
                  <>Welcome!</>
               ) : (
                  <>Please Log In</>
               )}
            </Box>
         </Route>

         <Route exact path="/login">
            <Login />
         </Route>

         <Route exact path="/register">
            <Register />
         </Route>
      </div>
   );
}

export default App;
