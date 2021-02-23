import React, { useState, useEffect } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   FormControl,
   FormLabel,
} from "@chakra-ui/react";
import { axiosWithAuth } from "../Utils/axiosWithAuth";
import Friend from "./Friend";

function Dash({ friends, setFriends }) {
   // console.log(props);

   // const friends = friends
   // const setFriends = setFriends

   const getFriends = () => {
      axiosWithAuth()
         .get(
            "http://localhost:5000/api/friends"
            // , {
            //    headers: {
            //       Authorization: localStorage.getItem("token"),
            //    },
            // }
         )
         .then((res) => {
            console.log(res);
            setFriends(res.data);
         });
   };

   function NewFriendModal() {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [newFriend, setNewFriend] = useState({
         email: "",
         name: "",
         age: "",
      });

      const postnewfriend = () => {
         axiosWithAuth()
            .post("/api/friends", {
               ...newFriend,
               id: friends.length,
            })
            .then((res) => getFriends());
      };

      return (
         <>
            <Button onClick={onOpen}>Add New Friend</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Add Friend</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                           placeholder="Email"
                           value={newFriend.email}
                           onChange={(e) => {
                              setNewFriend({
                                 ...newFriend,
                                 email: e.target.value,
                              });
                           }}
                        />
                     </FormControl>
                     <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                           placeholder="Name"
                           value={newFriend.name}
                           onChange={(e) => {
                              setNewFriend({
                                 ...newFriend,
                                 name: e.target.value,
                              });
                           }}
                        />
                     </FormControl>
                     <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input
                           placeholder="Age"
                           value={newFriend.age}
                           onChange={(e) => {
                              setNewFriend({
                                 ...newFriend,
                                 age: e.target.value,
                              });
                           }}
                        />
                     </FormControl>
                  </ModalBody>

                  <ModalFooter>
                     <Button colorScheme="blue" mr={3} onClick={postnewfriend}>
                        Add
                     </Button>
                     <Button variant="ghost" onClick={onClose}>
                        Close
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   }

   useEffect(() => {
      getFriends();
   }, []);

   return (
      <Box display="flex" justifyContent="space-between" width="90vw">
         <Box width="10vw" mr="5%">
            <NewFriendModal></NewFriendModal>
         </Box>
         <Box display="flex" flexWrap="wrap" justifyContent="center">
            {friends &&
               friends.map((i) => (
                  <Friend friend={i} onClick={() => {}}></Friend>
               ))}
         </Box>
      </Box>
   );
}

export default Dash;
