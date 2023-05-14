import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Link,
    useBoolean,
  } from "@chakra-ui/react";
  import useThrottle from "./customHooks/useThrottle";
  import React, { useEffect, useState } from "react";
  import { FaSearchLocation } from "react-icons/fa";
  function SearchBar() {
    
    const [onChangeValue, setOnChangeValue] = useState("");
    const [search, setSearch] = useState([]);
    const [Products, setProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useBoolean();
    const throttledText = useThrottle(onChangeValue, 400);
  
    const searchMovies = async () => {
      const data = await fetch(`http://localhost:4444/products`);//http://localhost:3000/cart
      const res = await data.json();
      setProducts(res);
    };
    useEffect(() => {
      searchMovies();
    }, []);
    useEffect(() => {
      if (throttledText === "") {
        setSearch([]);
      } else {
        console.log(throttledText);
        let newSuggestions = Products.filter((item) => {
          return item.title
            .split(" ")
            .join("")
            .trim()
            .toLowerCase()
            .indexOf(throttledText) !== -1? true: false;
        });
        setSearch(newSuggestions);
        setShowDropdown.on();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [throttledText]);
    console.log(search);
    const [add, setP] = useState("");
  
    return (
      <Box fontFamily={"Clear-Sans"} shadow={"sm"} bg="#fff">
        <Flex justify={"space-around"} minH={"40px"} py="10px" align={"center"}>
          <Flex
            gap={0.1}
            width={{ base: "100%", md: "60%" }}
            flexDir={{ base: "column", md: "row" }}
            align={"center"}
          >
            
            <Input
              ml={"20px"}
              variant="filled"
              placeholder="What is on Your mind today?"
              size="sm"
              w={"100%"}
              onChange={(e) => setOnChangeValue(e.target.value)}
            />
            {search.length > 0 && (
              <Box
                borderRadius="5px"
                position="absolute"
                top="100px"
                zIndex="100"
                bgColor="white"
                overflow="scroll"
                w="38%"
                maxH="400px"
                m="auto"
                left={"280"}
              >
                {search.map((item, i) => {
                  return (
                    <Link href={`/products/${item._id}`} key={i + 1}>
                      <Text
                        fontSize="16px"
                        p="10px"
                        cursor="pointer"
                        onClick={setShowDropdown.off}
                      >
                        {item.title}
                      </Text>
                    </Link>
                  );
                })}
              </Box>
            )}
          </Flex>
  
          
        </Flex>
      </Box>
    );
  }
  
  export default SearchBar;
  