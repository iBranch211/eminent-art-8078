import { Box, Heading } from "@chakra-ui/react";
import LeftDiv from "./Wishlist/LeftDiv";
import { RightDiv } from "./Wishlist/RightDiv";

const Wishlist = () => {
  return (
    <Box h="100vh" w="98%" m="auto">
      <Box
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-around"
        mt={"2%"}
      >
        <LeftDiv />
        <RightDiv />
      </Box>
    </Box>
  );
};

export { Wishlist };
