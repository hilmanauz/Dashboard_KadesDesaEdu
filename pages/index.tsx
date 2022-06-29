import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Text,
  Image,
  HStack,
  VStack,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import Router from "next/router";
import Cookies from "js-cookie";
import _ from "lodash";
import useClient from "../engines/useClient";

export type LoginForm = {
  username: string;
  password: string;
};

const gridRadius = "20px";

const percentageCount = (value: number) => Math.round((value / 24) * 100);

const Home: NextPage = () => {
  const client = useClient();
  const validateToken = client.validateEntityToken();
  const userData = client.getUserData();
  const EntityToken = Cookies.get("EntityToken");
  React.useEffect(() => {
    if (!validateToken.data) return;
    validateToken.data.data?.error && !EntityToken && Router.push("/login");
  }, [validateToken, EntityToken]);

  const personalityLevelPercentage = React.useMemo(() => {
    if (!userData.data?.dataLogin) return;
    return Object.entries({
      D: {
        value: percentageCount(userData.data?.dataLogin.dominance.Value),
        title: "Dominance",
        backgroundColor: "#F9AF1A",
        description:
          "Orang-orang dengan kepribadian Dominance memiliki kecenderungan karakter yang dominan, kuat, dengan ego yang tinggi. They are independent and risk taker. Mereka mudah merasa bosan dengan rutinitas, menyukai tantangan dan inovasi. Kepribadian DISC ini juga menyukai authority, responsibility, decision making, problem solving, multi tasking, maupun hal-hal lain yang membuatnya menjadi lebih dominan.",
      },
      I: {
        value: percentageCount(userData.data?.dataLogin.influence.Value),
        title: "Influence",
        backgroundColor: "#F90807",
        description:
          "Karakter DISC ini memiliki pengaruh yang besar bagi sekitarnya. Kepercayaan dirinya, antusiasmenya, selera humornya, dan optimismenya membawa semangat bagi lingkungannya. Sebagai negosiator yang handal, orang-orang dengan kepribadian Influence memiliki kemampuan persuasif yang bagus. Mereka menyukai popularitas, sehingga mereka sulit menerima penolakan dari orang lain.",
      },
      S: {
        value: percentageCount(userData.data?.dataLogin.steadiness.Value),
        title: "Steadiness",
        backgroundColor: "#1E75BB",
        description:
          "Konsisten, tenang, dan sabar adalah beberapa karakter yang menggambarkan kepribadian DISC yang satu ini. Sebaliknya, orang-orang dengan kepribadian Steadiness sulit menerima perubahan dan butuh waktu lama untuk menyesuaikan diri dengan lingkungan baru. Maka, mereka menyukai lingkungan yang memberi rasa aman tanpa perubahan yang mendadak.",
      },
      C: {
        value: percentageCount(userData.data?.dataLogin.compliance.Value),
        title: "Compliance",
        backgroundColor: "#3DB508",
        description:
          "Orang-orang berkarakter Compliance biasanya tekun, sistematis, teliti, cermat, fokus pada ketepatan dan kualitas. Cenderung analitis dan kritis, sosok kepribadian DISC ini suka mengejar kualitas dengan standar yang tinggi dan mengerjakan tugas-tugas yang rinci. Karenanya, mereka menyukai batasan, prosedur, dan metode yang jelas.",
      },
    });
  }, [userData.data?.dataLogin]);

  const personalityResult = React.useMemo(() => {
    if (!personalityLevelPercentage) return;
    return _.sortBy(personalityLevelPercentage, [
      function ([key, value]) {
        return value.value;
      },
    ]).reverse()[0];
  }, [personalityLevelPercentage]);

  const handleSignOut = React.useCallback(() => {
    Cookies.remove("EntityId");
    Cookies.remove("SessionTicket");
    Cookies.remove("EntityToken");
    Cookies.remove("PlayFabId");
    Router.push("/login");
  }, []);
  console.log(userData.data);
  if (!userData.data) return <></>;

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background.png"}
    >
      <Grid
        height={"83%"}
        width={"90%"}
        templateRows="repeat(15, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={10}
      >
        <GridItem
          colSpan={2}
          rowSpan={7}
          bg="rgb(233,224,182)"
          borderRadius={"50px"}
          border={"11px solid white"}
          outline={"6px solid black"}
          outlineOffset={"-11px"}
          position={"relative"}
          padding={"30px"}
          paddingBottom={"10px"}
          backgroundPosition={"center"}
          backgroundImage={"./Artboard.png"}
          backgroundSize={"cover"}
        >
          <Box
            position={"absolute"}
            top={-8}
            left={0}
            right={0}
            textAlign={"center"}
          >
            <Box
              width={"250px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              borderRadius={"16px"}
              border={"5px solid white"}
              outline={"3px solid black"}
              outlineOffset={"-6px"}
              background={
                "linear-gradient(0deg, rgba(39,111,187,1) 80%, rgba(93,149,196,1) 100%, rgba(93,149,196,1) 100%)"
              }
            >
              <Heading color={"white"}>Profile</Heading>
            </Box>
          </Box>
          <Center height={"100%"} width={"100%"}>
            <HStack flex={1} height={"100%"}>
              <Image src="./PakKades.png" alt="Dan Abramov" width={"25%"} />
              <VStack width={"75%"} height={"full"} spacing={0}>
                <Center
                  height={"full"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                >
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]}>Nama :</Heading>
                    <Text noOfLines={1}>
                      {userData.data?.dataLogin.nama?.Value}
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]} noOfLines={1}>
                      Umur :
                    </Heading>
                    <Text>{userData.data?.dataLogin.umur?.Value}</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]} noOfLines={1}>
                      Jenis kelamin :
                    </Heading>
                    <Text>{userData.data?.dataLogin.jenis_kelamin?.Value}</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]} noOfLines={1}>
                      Institusi :
                    </Heading>
                    <Text>{userData.data?.dataLogin.institusi?.Value}</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]} noOfLines={1}>
                      Kota :
                    </Heading>
                    <Text>{userData.data?.dataLogin.kota?.Value}</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={["sm", "3xl"]} noOfLines={1}>
                      NIP :
                    </Heading>
                    <Text>{userData.data?.dataLogin.NIP?.Value}</Text>
                  </HStack>
                </Center>
                <Spacer />
                <Button
                  alignSelf={"flex-end"}
                  colorScheme={"red"}
                  size={"lg"}
                  padding={"10px"}
                  onClick={handleSignOut}
                >
                  <Heading fontSize={["sm", "xl"]}>Sign Out</Heading>
                </Button>
              </VStack>
            </HStack>
          </Center>
        </GridItem>
        <GridItem
          colSpan={3}
          rowSpan={15}
          backgroundColor={"rgb(233,224,182)"}
          borderRadius={"50px"}
          border={"11px solid white"}
          outline={"6px solid black"}
          outlineOffset={"-11px"}
          position={"relative"}
          backgroundPosition={"center"}
          backgroundImage={"./Artboard.png"}
          backgroundSize={"cover"}
        >
          <Box
            position={"absolute"}
            top={-8}
            left={0}
            right={0}
            textAlign={"center"}
          >
            <Box
              width={"250px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              borderRadius={"16px"}
              border={"5px solid white"}
              outline={"3px solid black"}
              outlineOffset={"-6px"}
              background={
                "linear-gradient(0deg, rgba(39,111,187,1) 80%, rgba(93,149,196,1) 100%, rgba(93,149,196,1) 100%)"
              }
            >
              <Heading color={"white"}>Status</Heading>
            </Box>
          </Box>
          <Center width={"100%"} height={"100%"} padding={"30px"}>
            <VStack
              width={"inherit"}
              height={"100%"}
              justifyContent={"space-around"}
            >
              <VStack width={"100%"} spacing={6}>
                <VStack spacing={0}>
                  <Heading fontSize={"28px"}>PERSONALITY</Heading>
                  <Heading fontSize={"28px"}>RESULT</Heading>
                </VStack>
                <VStack width={"100%"} spacing={5}>
                  <Grid
                    h="250px"
                    width={"70%"}
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(6, 1fr)"
                    borderRadius={"25px"}
                    border={"3px solid black"}
                    backgroundColor={"white"}
                    gap={"0px"}
                  >
                    <GridItem
                      rowSpan={2}
                      colSpan={2}
                      border={"2px solid black"}
                      borderRadius={`${gridRadius} 0px 0px ${gridRadius}`}
                    >
                      <Center width={"full"} height={"full"}>
                        <VStack spacing={0}>
                          <Heading fontSize={"28px"}>DISC</Heading>
                          <Heading fontSize={"28px"}>Personality</Heading>
                        </VStack>
                      </Center>
                    </GridItem>
                    {personalityLevelPercentage?.map(([key, value]) => (
                      <GridItem
                        key={key}
                        rowSpan={1}
                        colSpan={1}
                        backgroundColor={value.backgroundColor}
                        border={"2px solid black"}
                        borderRadius={
                          key === "C" ? `0px ${gridRadius} 0px 0px` : ""
                        }
                      >
                        <Center width={"full"} height={"full"}>
                          <Heading fontSize={"80px"} color={"white"}>
                            {key}
                          </Heading>
                        </Center>
                      </GridItem>
                    ))}
                    {personalityLevelPercentage?.map(([key, value]) => (
                      <GridItem
                        key={key}
                        rowSpan={1}
                        colSpan={1}
                        backgroundColor={"white"}
                        border={"2px solid black"}
                        borderRadius={
                          key === "C" ? `0px 0px ${gridRadius} 0px` : ""
                        }
                      >
                        <Center width={"full"} height={"full"}>
                          <Heading fontSize={"45px"} color={"black"}>
                            {value.value}%
                          </Heading>
                        </Center>
                      </GridItem>
                    ))}
                  </Grid>
                  <HStack width={"75%"} justifyContent={"center"} gap={"8"}>
                    {personalityLevelPercentage?.map(([key, value]) => (
                      <HStack key={key}>
                        <Box
                          boxSize={"20px"}
                          borderRadius={"50%"}
                          backgroundColor={value.backgroundColor}
                          border={"3px solid black"}
                        />
                        <Heading fontSize={"18px"}>{value.title}</Heading>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
              <VStack width={"100%"} spacing={6}>
                <VStack spacing={0}>
                  <Heading fontSize={"28px"}>QUIZ LEVEL 2</Heading>
                  <Heading fontSize={"28px"}>RESULT</Heading>
                </VStack>
                <HStack width={"60%"} spacing={8}>
                  <HStack
                    backgroundColor={"white"}
                    width={"35%"}
                    borderRadius={"10px"}
                    border={"5px solid black"}
                    paddingX={"20px"}
                    paddingTop={"20px"}
                  >
                    <Center flexDirection={"column"}>
                      <Heading fontSize={"20px"}>Benar</Heading>
                      <Heading fontSize={"5rem"} color={"#1E75BB"}>
                        7
                      </Heading>
                    </Center>
                    <Spacer />
                    <Center flexDirection={"column"}>
                      <Heading fontSize={"20px"}>Salah</Heading>
                      <Heading fontSize={"5rem"} color={"#FE0400"}>
                        3
                      </Heading>
                    </Center>
                  </HStack>
                  <Grid
                    h="150px"
                    width={"65%"}
                    templateRows="repeat(3, 1fr)"
                    templateColumns="repeat(8, 1fr)"
                    borderRadius={"12px"}
                    border={"3px solid black"}
                    backgroundColor={"white"}
                    gap={0}
                  >
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                      borderRadius={"8px 0px 0px 0px"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>1</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>4</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>10</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                      borderRadius={"0px 8px 0px 0px"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>2</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>5</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>8</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}></Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}></Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                      borderRadius={"0px 0px 0px 8px"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>3</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>6</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>9</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}>7%</Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}></Heading>
                      </Center>
                    </GridItem>
                    <GridItem
                      rowSpan={1}
                      colSpan={1}
                      border={"2px solid black"}
                      borderRadius={"0px 0px 8px 0px"}
                    >
                      <Center width={"full"} height={"full"}>
                        <Heading fontSize={"18px"}></Heading>
                      </Center>
                    </GridItem>
                  </Grid>
                </HStack>
              </VStack>
            </VStack>
          </Center>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={8}
          bg="rgb(233,224,182)"
          borderRadius={"50px"}
          border={"11px solid white"}
          outline={"6px solid black"}
          outlineOffset={"-11px"}
          position={"relative"}
          padding={"30px"}
          backgroundImage={"./Artboard.png"}
          backgroundSize={"cover"}
        >
          <Box
            position={"absolute"}
            top={-8}
            left={0}
            right={0}
            textAlign={"center"}
          >
            <Box
              width={"250px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              borderRadius={"16px"}
              border={"5px solid white"}
              outline={"3px solid black"}
              outlineOffset={"-6px"}
              background={
                "linear-gradient(0deg, rgba(39,111,187,1) 80%, rgba(93,149,196,1) 100%, rgba(93,149,196,1) 100%)"
              }
            >
              <Heading color={"white"}>Nilai Akhir</Heading>
            </Box>
          </Box>
          <VStack height={"100%"} width={"100%"}>
            <Center>
              <Heading fontSize={"27px"}>Nilai akhir anda adalah</Heading>
            </Center>
            <HStack flex={1} height={"full"} width={"full"}>
              <Center width={"25%"}>
                <Image
                  src={`./Personality_${personalityResult?.[0]}.png`}
                  alt="Dan Abramov"
                  objectFit={"cover"}
                />
              </Center>
              <Spacer />
              <VStack alignItems={"flex-start"} width={"70%"}>
                <Heading
                  fontSize={"27px"}
                  letterSpacing={"0.3px"}
                  noOfLines={1}
                >
                  DISC Personality: {personalityResult?.[1].title}
                </Heading>
                <Text
                  fontSize={"18.5px"}
                  letterSpacing={"0.3px"}
                  textAlign={"justify"}
                  lineHeight={"6"}
                >
                  {personalityResult?.[1].description}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      {/* {JSON.stringify(userData.data)} */}
    </Center>
  );
};

export default Home;
