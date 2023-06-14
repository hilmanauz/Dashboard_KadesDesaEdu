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
  Stack,
  useBreakpointValue,
  FormHelperText,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Scrollbars from "rc-scrollbars";
import AutoSizer from "react-virtualized-auto-sizer";
import { BiMinus } from "react-icons/bi";
import Router from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import useClient from "../engines/useClient";
import Link from "next/link";

export const size = { lg: "lg", md: "md", sm: "sm" };

const imageSize = { lg: "220px", md: "170px", sm: "120px" };

const paddingContainer = { lg: "200px", md: "150px", sm: "100px" };

function LandingPage() {
  const client = useClient();
  const dataLogin = client.getUserData();
  const isMobile = useBreakpointValue({ sm: true, md: true, lg: false });
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
              <Stack
                height={"100vh"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                position={"relative"}
                direction={{ sm: "column", lg: "row" }}
                backgroundImage={{
                  sm: "./Background_Mobile.png",
                  lg: "./Background_Title.png",
                }}
                style={
                  isMobile
                    ? {
                        justifyContent: "center",
                        alignContent: "center",
                      }
                    : {}
                }
                paddingRight={{ lg: "100px", md: "60px", sm: "0px" }}
              >
                {!isLogin ? (
                  <Box
                    position={"absolute"}
                    top={"30px"}
                    right={{ lg: "100px", md: "60px", sm: "30px" }}
                  >
                    <Link href={"/login"}>
                      <Button
                        width={{ sm: "120px", md: "200px", lg: "230px" }}
                        height={{ sm: "50px", md: "70px" }}
                        variant={"unstyled"}
                        borderRadius={{ lg: "24px", md: "18px", sm: "15px" }}
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
                        fontSize={{ lg: "3xl", md: "2xl", sm: "xl" }}
                        color={"white"}
                        display={"flex"}
                      >
                        Login
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Box
                    position={"absolute"}
                    top={"30px"}
                    right={{ lg: "100px", md: "60px", sm: "30px" }}
                  >
                    <Button
                      width={{ sm: "120px", md: "200px", lg: "230px" }}
                      height={{ sm: "50px", md: "70px" }}
                      variant={"unstyled"}
                      borderRadius={{ lg: "24px", md: "18px", sm: "15px" }}
                      border={"8px solid white"}
                      outline={"5px solid black"}
                      outlineOffset={"-9px"}
                      onClick={handleSignOut}
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
                      fontSize={{ lg: "3xl", md: "2xl", sm: "xl" }}
                      color={"white"}
                      display={"flex"}
                    >
                      Logout
                    </Button>
                  </Box>
                )}
                {!isMobile && <Spacer />}
                <Center
                  paddingTop={{ sm: isLogin ? "40vh" : "25%", lg: 0 }}
                  width={{ sm: "99vw", lg: "43vw" }}
                  flexDirection={"column"}
                >
                  <Image src={"./Logo.png"} alt={"logo"} objectFit={"cover"} />
                  {isLogin && (
                    <VStack
                      marginTop={{ sm: "10px", lg: "50px" }}
                      spacing={{ sm: "10px", lg: "15px" }}
                    >
                      <FormControl>
                        <Button
                          width={"100%"}
                          bgColor={"#BE9770"}
                          paddingX={{ md: "80px", sm: "20px" }}
                          paddingY={"30px"}
                          onClick={() =>
                            Router.push(
                              "https://play.everidea.id/games/desakita/"
                            )
                          }
                          disabled
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
                              width={{ md: "2.2vw", sm: "7.5vw" }}
                            />
                            <Heading
                              marginY={"auto !important"}
                              height={"full"}
                              lineHeight={"0"}
                              size={size}
                              fontSize={{ sm: "20px" }}
                            >
                              Link From Desktop
                            </Heading>
                          </HStack>
                        </Button>
                        <FormHelperText
                          textAlign={"center"}
                          color={"white"}
                          fontSize={"md"}
                          fontWeight={"extrabold"}
                        >
                          <span style={{ fontSize: "25px" }}>&#9757;</span>{" "}
                          Under Maintenance
                        </FormHelperText>
                      </FormControl>
                      <FormControl>
                        <Button
                          width={"100%"}
                          bgColor={"#BE9770"}
                          paddingX={{ md: "80px", sm: "20px" }}
                          paddingY={"30px"}
                          onClick={() =>
                            Router.push(
                              "https://play.everidea.id/games/mobile/desakita/"
                            )
                          }
                          disabled
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
                              width={{ lg: "1.8vw", md: "2vw", sm: "5vw" }}
                            />
                            <Heading
                              marginY={"auto !important"}
                              height={"full"}
                              lineHeight={"0"}
                              size={size}
                              fontSize={{ sm: "20px" }}
                            >
                              Link From Mobile
                            </Heading>
                          </HStack>
                        </Button>
                        <FormHelperText
                          textAlign={"center"}
                          color={"white"}
                          fontSize={"md"}
                          fontWeight={"extrabold"}
                        >
                          <span style={{ fontSize: "25px" }}>&#9757;</span>{" "}
                          Under Maintenance
                        </FormHelperText>
                      </FormControl>
                      <Button
                        width={"100%"}
                        bgColor={"#BE9770"}
                        paddingX={{ md: "80px", sm: "20px" }}
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
                            width={{ lg: "1.8vw", md: "2vw", sm: "5vw" }}
                          />
                          <Heading
                            marginY={"auto !important"}
                            height={"full"}
                            lineHeight={"0"}
                            size={size}
                            fontSize={{ sm: "20px" }}
                          >
                            Link From Dashboard
                          </Heading>
                        </HStack>
                      </Button>
                    </VStack>
                  )}
                </Center>
              </Stack>
              <Box
                backgroundImage={"./Background_kertas.png"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                borderTop={"5px solid black"}
                position={"relative"}
                width={"full"}
                paddingY={paddingContainer}
                textAlign={"center"}
              >
                <Container maxW={{ md: "2xl", lg: "80vw" }}>
                  <VStack gap={{ sm: 16, lg: 36 }} letterSpacing={"1px"}>
                    <Center
                      width={"full"}
                      height={{ lg: "80vh", md: "45vh", sm: "40vh" }}
                      borderRadius={{ sm: "15px", lg: "30px" }}
                      bgColor={"#f9f3ea"}
                      boxShadow={
                        "0 20px 0 0 rgb(0 0 0 / 15%), 0 0 20px 0 rgb(0 0 0 / 14%)"
                      }
                      position={"relative"}
                    >
                      <iframe
                        style={{
                          height: "90%",
                          width: "95%",
                          position: "absolute",
                        }}
                        allow="autoplay; encrypted-media"
                        src={`https://www.youtube.com/embed/9k8gnC0X5xM?controls=0&rel=0`}
                        allowFullScreen
                      />
                    </Center>
                    {/* <Box
                      width={"full"}
                      height={"80vh"}
                      borderRadius={"30px"}
                      bgColor={"#f9f3ea"}
                      outline={"9px solid black"}
                      boxShadow={
                        "28px 28px 0 0 rgb(0 0 0 / 15%), 0 0 100px 0 rgb(0 0 0 / 14%)"
                      }
                    ></Box> */}
                    <HStack gap={6} justifyContent={"space-between"}>
                      <VStack
                        alignItems={"normal"}
                        flex={1}
                        textAlign={"justify"}
                      >
                        <Box
                          borderBottom={"5px solid black"}
                          width={"min-content"}
                          paddingBottom={{ lg: "10px", sm: "0px" }}
                          marginBottom={{ sm: "20px", lg: "40px" }}
                        >
                          <Heading size={size}>ABOUT</Heading>
                        </Box>
                        <Text size={size}>
                          The first DISC assessment game and sensing perception
                          gap training in Indonesia.
                        </Text>
                        <Text size={size}>
                          Who are you adalah permainan yang menggabungkan alat
                          penilaian serta penginderaan dan pelaksanaan
                          pelatihan. Who Are You akan menjadi pelatihan
                          kepemimpinan praktis bagi pemain yang menggabungkan
                          konsep kepekaan antarbudaya untuk menjembatani
                          pengetahuan dengan melatih soft-skill.
                        </Text>
                      </VStack>
                      <Box
                        width={{ lg: "220px", md: "170px", sm: "120px" }}
                        display={{ sm: "none", md: "flex" }}
                      >
                        <Image src="PakKades.png" alt={"PakKades"} />
                      </Box>
                    </HStack>
                    <VStack
                      gap={{ sm: "20px", lg: "50px" }}
                      alignItems={"normal"}
                    >
                      <Box
                        borderBottom={"5px solid black"}
                        width={"min-content"}
                        paddingBottom={{ lg: "10px", sm: "0px" }}
                      >
                        <Heading size={size}>DISC</Heading>
                      </Box>
                      <Grid
                        templateColumns={{
                          sm: "repeat(1, minmax(0px, 1fr))",
                          lg: "repeat(2, minmax(0px, 1fr))",
                        }}
                        gap={{ sm: 6, md: 10, lg: 16 }}
                        letterSpacing={"0.5px"}
                        textAlign={"justify"}
                        fontSize={{ lg: "1.7vw" }}
                      >
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={imageSize}>
                              <Image src="./D.png" alt="D" />
                            </Center>
                            <VStack alignItems={"normal"} flex={1}>
                              <Text size={size} fontWeight={"extrabold"}>
                                [D]ominance
                              </Text>
                              <Text size={size}>
                                Orang-orang dengan kepribadian Dominance
                                memiliki kecenderungan karakter yang dominan,
                                kuat, dengan ego yang tinggi. Mereka visioner,
                                mandiri, dan berani mengambil risiko.
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={imageSize}>
                              <Image src="./I.png" alt="I" />
                            </Center>
                            <VStack alignItems={"normal"} flex={1}>
                              <Text size={size} fontWeight={"extrabold"}>
                                [I]nfluence
                              </Text>
                              <Text size={size}>
                                Karakter DISC ini memiliki pengaruh yang besar
                                bagi sekitarnya. Kepercayaan dirinya,
                                antusiasmenya, selera humornya, dan optimismenya
                                membawa semangat bagi lingkungannya.
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={imageSize}>
                              <Image src="./S.png" alt="S" />
                            </Center>
                            <VStack alignItems={"normal"} flex={1}>
                              <Text size={size} fontWeight={"extrabold"}>
                                [S]teadiness
                              </Text>
                              <Text size={size}>
                                Konsisten, tenang, dan sabar adalah beberapa
                                karakter yang menggambarkan kepribadian DISC
                                yang satu ini.
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <HStack gap={6}>
                            <Center height={"full"} width={imageSize}>
                              <Image src="./C.png" alt="C" />
                            </Center>
                            <VStack alignItems={"normal"} flex={1}>
                              <Text size={size} fontWeight={"extrabold"}>
                                [C]ompliance
                              </Text>
                              <Text size={size}>
                                Orang-orang berkarakter Compliance biasanya
                                tekun, sistematis, teliti, cermat, fokus pada
                                ketepatan dan kualitas.
                              </Text>
                            </VStack>
                          </HStack>
                        </GridItem>
                      </Grid>
                    </VStack>
                    <Stack alignItems={"normal"} width={"full"}>
                      <Box
                        borderBottom={"5px solid black"}
                        width={"min-content"}
                        paddingBottom={"10px"}
                        marginBottom={{ sm: "20px", lg: "40px" }}
                      >
                        <Heading size={size}>Information</Heading>
                      </Box>
                      <Center>
                        <VStack width={"full"}>
                          <HStack width={"full"}>
                            <Box width={"30%"} />
                            <Heading size={{ ...size, sm: "xs" }} width={"35%"}>
                              Mobile
                            </Heading>
                            <Heading size={{ ...size, sm: "xs" }} width={"35%"}>
                              Desktop
                            </Heading>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              CPU:
                            </Text>
                            <Text size={size} width={"35%"}>
                              Qualcomm® Snapdragon™ 662
                            </Text>
                            <Text size={size} width={"35%"}>
                              i3
                            </Text>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              OS:
                            </Text>
                            <Text size={size} width={"35%"}>
                              Android 10
                            </Text>
                            <Text size={size} width={"35%"}>
                              Windows, linux, MacOS
                            </Text>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              RAM:
                            </Text>
                            <Text size={size} width={"35%"}>
                              6 GB
                            </Text>
                            <Text size={size} width={"35%"}>
                              6 GB
                            </Text>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              Resolution:
                            </Text>
                            <Text size={size} width={"35%"}>
                              1080x2340 {`(${6.53}")`}
                            </Text>
                            <Text size={size} width={"35%"}>
                              1280x1024
                            </Text>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              Browser:
                            </Text>
                            <Text size={size} width={"35%"}>
                              Updated Browser
                            </Text>
                            <Text size={size} width={"35%"}>
                              Updated Browser
                            </Text>
                          </HStack>
                          <HStack width={"full"}>
                            <Text size={size} width={"30%"}>
                              Network:
                            </Text>
                            <Text size={size} width={"35%"}>
                              8 mbps
                            </Text>
                            <Text size={size} width={"35%"}>
                              8 mbps
                            </Text>
                          </HStack>
                        </VStack>
                      </Center>
                    </Stack>
                  </VStack>
                </Container>
              </Box>
              <VStack
                position={"relative"}
                width={"full"}
                backgroundSize={"cover"}
                backgroundImage={"./Background_Everidea.png"}
                color={"white"}
                borderTop={"5px solid black"}
              >
                <Center height={"450px"}>
                  <Container maxW={{ md: "2xl", lg: "80vw" }}>
                    <Grid
                      templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                      }}
                      gap={16}
                    >
                      <GridItem w="100%">
                        <VStack alignItems={"normal"} spacing={"30px"}>
                          <VStack alignItems={"inherit"}>
                            <Heading size={size}>Say Hello</Heading>
                            <Text size={size}>Contact@everidea.id</Text>
                          </VStack>
                          <VStack alignItems={"inherit"}>
                            <Heading size={size}>Stop by</Heading>
                            <Text size={size}>
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
                        <Stack
                          flexDirection={{ sm: "row", md: "column", lg: "row" }}
                          gap={10}
                        >
                          <Box width={{ sm: "50%", md: "100%", lg: "50%" }}>
                            <Image src={"./EI.png"} alt={"Logo_EI"} />
                          </Box>
                          <Box width={{ sm: "50%", md: "100%", lg: "50%" }}>
                            <Image src={"./Edu.png"} alt={"Logo_Edu"} />
                          </Box>
                        </Stack>
                      </GridItem>
                    </Grid>
                  </Container>
                </Center>
                <Center height={"75px"}>
                  <Heading fontSize={"20px"} textAlign={"center"}>
                    &copy; Everidea All Right Reserved
                  </Heading>
                </Center>
              </VStack>
            </VStack>
          </Box>
        </Scrollbars>
      )}
    </AutoSizer>
  );
}

export default LandingPage;
