import React, { useState, use } from "react";
import { Box } from "@chakra-ui/react";
import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   Input,
   Button,
} from "@chakra-ui/react";
import { axiosWithAuth } from "../Utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

function Login() {
   const [credential, setCredential] = useState({
      username: "Lambda School",
      password: "i<3Lambd4",
   });
   const [error, setError] = useState("");
   const history = useHistory();
   const login = () => {
      if (localStorage.getItem("token").length > 5) {
         setError(String("You're already logged in"));
         setTimeout(() => {
            if (error !== "") {
               setError("");
            }
         }, 2000);
         return;
      }
      axiosWithAuth()
         .post("/api/login", {
            username: credential.username,
            password: credential.password,
         })
         .then((res) => {
            console.log(res);

            localStorage.setItem("token", res.data.payload);
            history.push("/friends");
         })
         .catch((err) => {
            setError("Wrong username or password");
            setTimeout(() => {
               if (error !== "") {
                  setError("");
               }
            }, 2000);
         });
   };

   return (
      <Box display="flex" flexDir="column" width="50%">
         <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
               placeholder="Lambda School"
               defaultValue="Lambda School"
               onChange={(e) => {
                  setCredential({ ...credential, username: e.target.value });
               }}
            />
         </FormControl>
         <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
               placeholder="i<3Lambd4"
               defaultValue="i<3Lambd4"
               onChange={(e) => {
                  setCredential({ ...credential, password: e.target.value });
               }}
            />
         </FormControl>

         <FormControl isInvalid={error.length > 0}>
            <FormErrorMessage> {error} </FormErrorMessage>
         </FormControl>
         <Box display="flex" width="100%" justifyContent="center">
            <Button
               margin="2%"
               onClick={() => {
                  login();
               }}
            >
               Login
            </Button>
            <Button margin="2%"> Cancel </Button>
         </Box>
      </Box>
   );
}

export default Login;
