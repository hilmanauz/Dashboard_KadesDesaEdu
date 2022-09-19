import {
  VStack,
  Center,
  Container,
  Image,
  Box,
  Heading,
  HStack,
  Text,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Scrollbars from "rc-scrollbars";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiMinus } from "react-icons/bi";
import Router from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import useClient from "../engines/useClient";
import Link from "next/link";

function LandingPage() {
  const client = useClient();
  const dataLogin = client.getUserData();
  const validateToken = client.validateEntityToken();
  const EntityToken = getCookie("EntityToken");
  const isLogin = React.useMemo(
    () => !validateToken.data?.data?.error && EntityToken && dataLogin.data,
    [validateToken.data, EntityToken, dataLogin.data]
  );
  const handleSignOut = React.useCallback(() => {
    deleteCookie("EntityId");
    deleteCookie("SessionTicket");
    deleteCookie("EntityToken");
    deleteCookie("PlayFabId");
  }, []);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Scrollbars style={{ height, width }}>
          <Box h="full" w="full" position="relative">
            <VStack alignItems={"normal"} spacing={0}>
              <HStack
                height={"100vh"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                position={"relative"}
                backgroundImage={"./Background_Title.png"}
                paddingRight={"100px"}
              >
                {!isLogin ? (
                  <Box position={"absolute"} top={"30px"} right={"100px"}>
                    <Link href={"/login"}>
                      <Button
                        width={"200px"}
                        height={"80px"}
                        variant={"unstyled"}
                        borderRadius={"24px"}
                        border={"8px solid white"}
                        outline={"5px solid black"}
                        outlineOffset={"-9px"}
                        background={
                          "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)"
                        }
                        _loading={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)",
                        }}
                        _hover={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)",
                        }}
                        fontSize={"3xl"}
                        color={"white"}
                        display={"flex"}
                      >
                        Login
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Box position={"absolute"} top={"30px"} right={"100px"}>
                    <Button
                      width={"200px"}
                      height={"80px"}
                      variant={"unstyled"}
                      borderRadius={"24px"}
                      border={"8px solid white"}
                      outline={"5px solid black"}
                      onClick={handleSignOut}
                      outlineOffset={"-9px"}
                      background={
                        "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)"
                      }
                      _loading={{
                        background:
                          "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)",
                      }}
                      _hover={{
                        background:
                          "radial-gradient(300px 65px at bottom center, rgba(249,175,26,1) 80%, rgba(251,199,95,1) 90%, rgba(251,199,95,1) 100%)",
                      }}
                      fontSize={"3xl"}
                      color={"white"}
                      display={"flex"}
                    >
                      Logout
                    </Button>
                  </Box>
                )}
                <Spacer />
                <Box width={"43vw"} flexDirection={"column"}>
                  <Image src={"./Logo.png"} alt={"logo"} objectFit={"cover"} />
                  {isLogin && (
                    <VStack marginTop={"50px"} spacing={"30px"}>
                      <Button
                        width={"55%"}
                        bgColor={"#BE9770"}
                        paddingX={"80px"}
                        paddingY={"30px"}
                        onClick={() =>
                          Router.push(
                            "https://play.everidea.id/games/desakita/"
                          )
                        }
                        color={"white"}
                        borderRadius={"24px"}
                        border={"8px solid white"}
                        outline={"5px solid black"}
                        outlineOffset={"-9px"}
                        background={
                          "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)"
                        }
                        _loading={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _hover={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _active={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                          boxShadow: "none",
                        }}
                      >
                        <HStack justifyContent={"center"} gap={"10px"}>
                          <Image
                            src="./Desktop_Icon.png"
                            alt="Desktop_Icon"
                            width={"2.2vw"}
                          />
                          <Heading
                            marginY={"auto !important"}
                            height={"full"}
                            lineHeight={"0"}
                            fontSize={{ lg: "1.5vw" }}
                          >
                            Link From Desktop
                          </Heading>
                        </HStack>
                      </Button>
                      <Button
                        width={"55%"}
                        bgColor={"#BE9770"}
                        paddingX={"80px"}
                        paddingY={"30px"}
                        onClick={() =>
                          Router.push(
                            "https://play.everidea.id/games/mobile/desakita/"
                          )
                        }
                        color={"white"}
                        borderRadius={"24px"}
                        border={"8px solid white"}
                        outline={"5px solid black"}
                        outlineOffset={"-9px"}
                        background={
                          "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)"
                        }
                        _loading={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _hover={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _active={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                          boxShadow: "none",
                        }}
                      >
                        <HStack justifyContent={"center"} gap={"10px"}>
                          <Image
                            src="./Mobile_Icon.png"
                            alt="Mobile_Icon"
                            width={"1.8vw"}
                          />
                          <Heading
                            marginY={"auto !important"}
                            height={"full"}
                            lineHeight={"0"}
                            fontSize={{ lg: "1.5vw" }}
                          >
                            Link From Mobile
                          </Heading>
                        </HStack>
                      </Button>
                      <Button
                        width={"55%"}
                        bgColor={"#BE9770"}
                        paddingX={"80px"}
                        paddingY={"30px"}
                        onClick={() => Router.push("/dashboard")}
                        color={"white"}
                        borderRadius={"24px"}
                        border={"8px solid white"}
                        outline={"5px solid black"}
                        outlineOffset={"-9px"}
                        background={
                          "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)"
                        }
                        _loading={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _hover={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                        }}
                        _active={{
                          background:
                            "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
                          boxShadow: "none",
                        }}
                      >
                        <HStack justifyContent={"center"} gap={"10px"}>
                          <Image
                            src="./Dashboard_Icon.png"
                            alt="Dashboard_Icon"
                            width={"1.8vw"}
                          />
                          <Heading
                            marginY={"auto !important"}
                            height={"full"}
                            lineHeight={"0"}
                            fontSize={{ lg: "1.5vw" }}
                          >
                            Link From Dashboard
                          </Heading>
                        </HStack>
                      </Button>
                    </VStack>
                  )}
                </Box>
              </HStack>
              <Box
                fontSize={"30px"}
                backgroundImage={"./Background_kertas.png"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                position={"relative"}
                width={"full"}
                paddingY={"200px"}
                textAlign={"center"}
              >
                <Container maxW="80vw">
                  <VStack spacing={"15vh"} letterSpacing={"1px"}>
                    <Box
                      width={"full"}
                      height={"80vh"}
                      borderRadius={"30px"}
                      bgColor={"#f9f3ea"}
                      outline={"9px solid black"}
                      boxShadow={
                        "28px 28px 0 0 rgb(0 0 0 / 15%), 0 0 100px 0 rgb(0 0 0 / 14%)"
                      }
                    ></Box>
                    <Box
                      width={"full"}
                      alignSelf={"center"}
                      flexDirection={"column"}
                    >
                      <Box
                        borderBottom={"5px solid black"}
                        width={"min-content"}
                        paddingBottom={"10px"}
                      >
                        <Heading fontSize={{ lg: "2.7vw" }} size={"lg"}>
                          ABOUT
                        </Heading>
                      </Box>
                      <HStack gap={"5vw"} justifyContent={"space-between"}>
                        <VStack
                          textAlign={"justify"}
                          alignItems={"normal"}
                          width={"55vw"}
                          fontSize={{ lg: "1.7vw" }}
                        >
                          <Text>
                            The first DISC assessment game and sensing
                            perception gap training in Indonesia
                          </Text>
                          <Text>
                            Who are you adalah permainan yang menggabungkan alat
                            penilaian serta penginderaan dan pelaksanaan
                            pelatihan. Who Are You akan menjadi pelatihan
                            kepemimpinan praktis bagi pemain yang menggabungkan
                            konsep kepekaan antarbudaya untuk menjembatani
                            pengetahuan dengan melatih soft-skill.
                          </Text>
                        </VStack>
                        <Box width={"15vw"}>
                          <Image src="PakKades.png" alt={"PakKades"} />
                        </Box>
                      </HStack>
                    </Box>
                    <VStack gap={"50px"} alignItems={"normal"}>
                      <Box
                        borderBottom={"5px solid black"}
                        width={"min-content"}
                        paddingBottom={"10px"}
                      >
                        <Heading fontSize={{ lg: "2.7vw" }} size={"lg"}>
                          DISC
                        </Heading>
                      </Box>
                      <Grid
                        templateColumns="repeat(2, minmax(0px, 1fr))"
                        gap={16}
                        letterSpacing={"0.5px"}
                        textAlign={"justify"}
                        fontSize={{ lg: "1.7vw" }}
                      >
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={"28%"}>
                              <Image src="./D.png" alt="D" />
                            </Center>
                            <VStack alignItems={"normal"} width={"72%"}>
                              <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={"28%"}>
                              <Image src="./I.png" alt="I" />
                            </Center>
                            <VStack alignItems={"normal"} width={"72%"}>
                              <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={"28%"}>
                              <Image src="./S.png" alt="S" />
                            </Center>
                            <VStack alignItems={"normal"} width={"72%"}>
                              <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={"28%"}>
                              <Image src="./C.png" alt="C" />
                            </Center>
                            <VStack alignItems={"normal"} width={"72%"}>
                              <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                      </Grid>
                    </VStack>
                    <VStack
                      alignItems={"normal"}
                      width={"full"}
                      gap={10}
                      fontSize={{ lg: "1.7vw" }}
                    >
                      <Box
                        borderBottom={"5px solid black"}
                        width={"min-content"}
                        paddingBottom={"10px"}
                      >
                        <Heading fontSize={{ lg: "2.7vw" }} size={"lg"}>
                          Information
                        </Heading>
                      </Box>
                      <Center>
                        <VStack alignItems={"normal"}>
                          <Text color={"transparent"}>_</Text>
                          <Text>CPU:</Text>
                          <Text>OS:</Text>
                          <Text>RAM:</Text>
                          <Text>Resolution:</Text>
                          <Text>Browser:</Text>
                          <Text>Network:</Text>
                        </VStack>
                        <VStack>
                          <Heading>Mobile</Heading>
                          <Text>Qualcomm® Snapdragon™ 662</Text>
                          <Text>Android 10</Text>
                          <Text>6 GB</Text>
                          <Text>1080x2340 {`(${6.53}")`}</Text>
                          <Text>Updated Browser</Text>
                          <Text>8 mbps</Text>
                        </VStack>
                        <Box width={"50px"}></Box>
                        <VStack>
                          <Heading>Desktop</Heading>
                          <Text>i3</Text>
                          <Text>Windows, linux, MacOS</Text>
                          <Text>6 GB</Text>
                          <Text>1280x1024</Text>
                          <Text>Updated Browser</Text>
                          <Text>8 mbps</Text>
                        </VStack>
                      </Center>
                    </VStack>
                  </VStack>
                </Container>
              </Box>
              <VStack
                position={"relative"}
                width={"full"}
                backgroundSize={"cover"}
                backgroundImage={"./Background_Everidea.png"}
                color={"white"}
              >
                <Center fontSize={{ lg: "1.8vw" }} height={"60vh"}>
                  <Container maxW="80vw">
                    <Grid templateColumns="repeat(2, 1fr)" gap={16}>
                      <GridItem w="100%">
                        <VStack alignItems={"normal"} spacing={"30px"}>
                          <VStack alignItems={"inherit"}>
                            <Heading>Say Hello</Heading>
                            <Text>Contact@everidea.id</Text>
                          </VStack>
                          <VStack alignItems={"inherit"}>
                            <Heading>Stop by</Heading>
                            <Text>
                              Jalan Karang Tinggal No.31 Bandung, Jawa Barat
                              40162
                            </Text>
                          </VStack>
                        </VStack>
                      </GridItem>
                      {/* <GridItem w="100%">
                      <VStack>
                        <Heading>Get Social</Heading>
                        <Text>Instagram</Text>
                        <Text>Linkedin</Text>
                        <Text>Youtube</Text>
                        <Text>Medium</Text>
                      </VStack>
                    </GridItem> */}
                      <GridItem w="100%">
                        <HStack gap={10}>
                          <Box width={"50%"}>
                            <Image src={"./EI.png"} alt={"Logo_EI"} />
                          </Box>
                          <Box width={"50%"}>
                            <Image src={"./Edu.png"} alt={"Logo_Edu"} />
                          </Box>
                        </HStack>
                      </GridItem>
                    </Grid>
                  </Container>
                </Center>
                <Heading textAlign={"center"} height={"10vh"}>
                  &copy; Everidea All Right Reserved
                </Heading>
              </VStack>
            </VStack>
          </Box>
        </Scrollbars>
      )}
    </AutoSizer>
  );
}

export default LandingPage;
