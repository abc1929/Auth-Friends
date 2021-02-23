import React, { useState, use } from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Friend(props) {
   const { id, age, email, name } = props.friend;

   return (
      <Box
         background="#ccfdea"
         borderRadius="9px"
         padding="4%"
         margin="4%"
         width="300px"
      >
         <Text>Age:{age}</Text>
         <Text>Email:{email}</Text>
         <Text>Name:{name}</Text>
      </Box>
   );
}
