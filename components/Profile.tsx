import {
  GridItem,
  Box,
  Heading,
  Center,
  HStack,
  VStack,
  Spacer,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import Cookies from "js-cookie";
import Router from "next/router";
import React from "react";
import { SWRResponse } from "swr";
import { size } from "./LandingPage";

const profileTitle = [
  "Nama",
  "Umur",
  "Jenis kelamin",
  "NIP",
  "Institusi",
  "Kota",
];

function Profile({
  userData,
}: {
  userData: { dataLogin: any; accountInfo: any };
}) {
  const profile: { title: string; value: string }[] = React.useMemo(() => {
    if (!userData.dataLogin?.profile) return;
    return JSON.parse(userData.dataLogin.profile?.Value).map(
      (val: string, i: number) => ({
        title: profileTitle[i],
        value: val,
      })
    );
  }, [userData.dataLogin]);

  const handleSignOut = React.useCallback(() => {
    deleteCookie("EntityId");
    deleteCookie("SessionTicket");
    deleteCookie("EntityToken");
    deleteCookie("PlayFabId");
    Router.push("/login");
  }, []);

  return (
    <GridItem
      colSpan={{ sm: 1, lg: 2 }}
      rowSpan={7}
      bg="rgb(233,224,182)"
      borderRadius={{ sm: "30px", lg: "50px" }}
      border={"11px solid white"}
      outline={"6px solid black"}
      outlineOffset={"-11px"}
      position={"relative"}
      padding={"1.5vw"}
      paddingTop={"1.9vw"}
      paddingBottom={"10px"}
      backgroundPosition={"center"}
      backgroundImage={"./Artboard.png"}
      backgroundSize={"cover"}
    >
      <Box
        position={"absolute"}
        top={{ sm: -5, md: -6, lg: -8 }}
        left={0}
        right={0}
        textAlign={"center"}
      >
        <Box
          width={"fit-content"}
          marginLeft={"auto"}
          marginRight={"auto"}
          borderRadius={{ sm: "14px", lg: "16px" }}
          border={"5px solid white"}
          outline={"3px solid black"}
          outlineOffset={"-6px"}
          background={
            "linear-gradient(0deg, rgba(39,111,187,1) 80%, rgba(93,149,196,1) 100%, rgba(93,149,196,1) 100%)"
          }
        >
          <Heading
            color={"white"}
            paddingInline={{ sm: "6vw", lg: "2vw" }}
            fontSize={{ base: "16px", md: "22px", lg: "2.2vw" }}
          >
            Profile
          </Heading>
        </Box>
      </Box>
      <Center height={"100%"} width={"100%"}>
        <HStack flex={1} height={"100%"} spacing={0}>
          <Center width={{ sm: "30%", md: "25%", lg: "25%" }} height={"full"}>
            <Image src="./PakKades.png" alt="Dan Abramov" width={"full"} />
          </Center>
          <VStack
            width={{ base: "100%", lg: "75%" }}
            height={"full"}
            spacing={0}
          >
            <Center
              height={"full"}
              width={"full"}
              flexDirection={"column"}
              alignItems={"flex-start"}
            >
              {profile?.map((section) => (
                <HStack key={section.value}>
                  <Heading
                    fontSize={{ base: "15px", md: "3.5vw", lg: "1.5vw" }}
                  >
                    {section.title}:
                  </Heading>
                  <Text
                    flex={1}
                    fontSize={{
                      base: "12px",
                      md: "3vw",
                      lg: "1.25vw",
                    }}
                  >
                    {section.value}
                  </Text>
                </HStack>
              ))}
            </Center>
            <Spacer />
            <Button
              alignSelf={"flex-end"}
              colorScheme={"red"}
              padding={"10px"}
              onClick={handleSignOut}
              size={{ ...size, sm: "xs" }}
            >
              Sign Out
            </Button>
          </VStack>
        </HStack>
      </Center>
    </GridItem>
  );
}

export default Profile;
