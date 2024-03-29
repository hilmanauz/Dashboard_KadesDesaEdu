import {
  GridItem,
  Box,
  Heading,
  Center,
  VStack,
  Grid,
  HStack,
  Spacer,
  Image,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";

const percentageCount = (value: number) => Math.round((value / 24) * 100);

function Status({
  userData,
}: {
  userData: {
    dataLogin: any;
    accountInfo: any;
  };
}) {
  const isMobile = useBreakpointValue({ sm: true, md: false });
  const gridRadius = React.useMemo(
    () => (isMobile ? "18px" : "20px"),
    [isMobile]
  );
  const personalityLevelPercentage = React.useMemo(() => {
    if (!userData.dataLogin?.personalityData) return;
    const personality = userData.dataLogin.personalityData.Value.replace(
      /\[|\]/g,
      ""
    ).split(",");
    return Object.entries({
      D: {
        value: percentageCount(personality[0]),
        title: "Dominance",
        backgroundColor: "#F9AF1A",
        description:
          "Orang-orang dengan kepribadian Dominance memiliki kecenderungan karakter yang dominan, kuat, dengan ego yang tinggi. They are independent and risk taker. Mereka mudah merasa bosan dengan rutinitas, menyukai tantangan dan inovasi. Kepribadian DISC ini juga menyukai authority, responsibility, decision making, problem solving, multi tasking, maupun hal-hal lain yang membuatnya menjadi lebih dominan.",
      },
      I: {
        value: percentageCount(personality[1]),
        title: "Influence",
        backgroundColor: "#F90807",
        description:
          "Karakter DISC ini memiliki pengaruh yang besar bagi sekitarnya. Kepercayaan dirinya, antusiasmenya, selera humornya, dan optimismenya membawa semangat bagi lingkungannya. Sebagai negosiator yang handal, orang-orang dengan kepribadian Influence memiliki kemampuan persuasif yang bagus. Mereka menyukai popularitas, sehingga mereka sulit menerima penolakan dari orang lain.",
      },
      S: {
        value: percentageCount(personality[2]),
        title: "Steadiness",
        backgroundColor: "#1E75BB",
        description:
          "Konsisten, tenang, dan sabar adalah beberapa karakter yang menggambarkan kepribadian DISC yang satu ini. Sebaliknya, orang-orang dengan kepribadian Steadiness sulit menerima perubahan dan butuh waktu lama untuk menyesuaikan diri dengan lingkungan baru. Maka, mereka menyukai lingkungan yang memberi rasa aman tanpa perubahan yang mendadak.",
      },
      C: {
        value: percentageCount(personality[3]),
        title: "Compliance",
        backgroundColor: "#3DB508",
        description:
          "Orang-orang berkarakter Compliance biasanya tekun, sistematis, teliti, cermat, fokus pada ketepatan dan kualitas. Cenderung analitis dan kritis, sosok kepribadian DISC ini suka mengejar kualitas dengan standar yang tinggi dan mengerjakan tugas-tugas yang rinci. Karenanya, mereka menyukai batasan, prosedur, dan metode yang jelas.",
      },
    });
  }, [userData.dataLogin]);
  const scoreLevel2 = userData.dataLogin?.scoreData?.Value?.replace(
    /\[|\]/g,
    ""
  )
    .split(",")
    .map((score: string) => parseInt(score));

  return (
    <GridItem
      colSpan={{ lg: 3, sm: 1 }}
      rowSpan={15}
      backgroundColor={"rgb(233,224,182)"}
      borderRadius={{ sm: "30px", lg: "50px" }}
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
            Status
          </Heading>
        </Box>
      </Box>
      <Center
        width={"100%"}
        height={"100%"}
        padding={{ sm: "15px", md: "30px" }}
        paddingTop={{ sm: "30px" }}
      >
        <VStack
          width={"inherit"}
          height={"100%"}
          justifyContent={"space-around"}
          gap={{ lg: 2, sm: 6 }}
        >
          <VStack
            width={"100%"}
            spacing={{
              sm: userData.dataLogin.level1?.Value === "False" ? 3 : 4,
              md: userData.dataLogin.level1?.Value === "False" ? 3 : 6,
            }}
          >
            <VStack spacing={0}>
              <Heading fontSize={{ sm: "3vw", lg: "1.5vw" }}>
                PERSONALITY
              </Heading>
              <Heading fontSize={{ sm: "3vw", lg: "1.5vw" }}>RESULT</Heading>
            </VStack>
            <VStack width={"100%"}>
              {userData.dataLogin.level1.Value === "False" ? (
                <Box
                  h={{ sm: "60%", md: "40%" }}
                  width={{ sm: "60%", md: "40%" }}
                >
                  <Image src={"./Empty_state.png"} alt="Dan Abramov" />
                </Box>
              ) : (
                <>
                  <Grid
                    h="25vh"
                    width={{ sm: "100%", md: "80%", lg: "37vw" }}
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
                          <Heading
                            fontSize={{
                              base: "3.5vw",
                              md: "2.5vw",
                              lg: "1.55vw",
                            }}
                          >
                            DISC
                          </Heading>
                          <Heading
                            fontSize={{
                              base: "3.5vw",
                              md: "2.5vw",
                              lg: "1.55vw",
                            }}
                          >
                            Personality
                          </Heading>
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
                          <Heading
                            fontSize={{
                              base: "8vw",
                              md: "5vw",
                              lg: "3.5vw",
                            }}
                            color={"white"}
                          >
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
                          <Heading
                            fontSize={{
                              base: "6vw",
                              md: "4vw",
                              lg: "2vw",
                            }}
                            color={"black"}
                          >
                            {value.value}%
                          </Heading>
                        </Center>
                      </GridItem>
                    ))}
                  </Grid>
                  <HStack
                    justifyContent={"center"}
                    gap={{ base: "0", md: "4", lg: "8" }}
                    css={css`
                      @media only screen and (min-width: 1280px) and (max-width: 1440px) {
                        gap: 0.6rem;
                      }
                    `}
                  >
                    {personalityLevelPercentage?.map(([key, value]) => (
                      <HStack key={key}>
                        <Box
                          boxSize={{ sm: "15px", md: "20px" }}
                          borderRadius={"50%"}
                          backgroundColor={value.backgroundColor}
                          border={"3px solid black"}
                        />
                        <Heading
                          fontSize={{
                            base: "2vw",
                            md: "1.8vw",
                            lg: "0.95vw",
                          }}
                        >
                          {value.title}
                        </Heading>
                      </HStack>
                    ))}
                  </HStack>
                </>
              )}
            </VStack>
          </VStack>
          <VStack
            width={"100%"}
            spacing={{
              sm: userData.dataLogin.level2?.Value === "False" ? 3 : 4,
              md: userData.dataLogin.level2?.Value === "False" ? 3 : 6,
            }}
          >
            <VStack spacing={0}>
              <Heading fontSize={{ sm: "3vw", lg: "1.5vw" }}>
                QUIZ LEVEL 2
              </Heading>
              <Heading fontSize={{ sm: "3vw", lg: "1.5vw" }}>RESULT</Heading>
            </VStack>
            {userData.dataLogin.alreadyLevel2?.Value === "False" ? (
              <Box
                h={{ sm: "60%", md: "40%" }}
                width={{ sm: "60%", md: "40%" }}
              >
                <Image src={"./Empty_state.png"} alt="Dan Abramov" />
              </Box>
            ) : (
              <HStack
                width={{ sm: "100%", md: "90%", lg: "80%" }}
                gap={{ sm: 3, md: 8 }}
              >
                <HStack
                  backgroundColor={"white"}
                  borderRadius={"10px"}
                  border={"5px solid black"}
                  width={{ sm: "25%", md: "25%" }}
                  height={"20vh"}
                  paddingX={{ base: "0.5vw", md: "1vw", lg: "1vw" }}
                  paddingY={{ base: "0.5vh", md: "1vh", lg: "1vh" }}
                >
                  <Center
                    flexDirection={"column"}
                    height={"full"}
                    width={"full"}
                  >
                    <Heading
                      fontSize={{ base: "4.5vw", md: "2.5vw", lg: "2.3vw" }}
                    >
                      Score
                    </Heading>
                    <Heading
                      fontSize={{ base: "10vw", md: "6vw", lg: "5vw" }}
                      color={"#1E75BB"}
                    >
                      {userData.dataLogin?.score?.Value}
                    </Heading>
                  </Center>
                </HStack>
                <Grid
                  h={"20vh"}
                  width={{ sm: "75%", md: "75%" }}
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
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>1</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[0] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>4</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[3] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>7</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[6] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>
                        10
                      </Heading>
                    </Center>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    border={"2px solid black"}
                    borderRadius={"0px 8px 0px 0px"}
                  >
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[9] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>2</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[1] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>5</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[4] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>8</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[7] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}></Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}></Heading>
                    </Center>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    border={"2px solid black"}
                    borderRadius={"0px 0px 0px 8px"}
                  >
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>3</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[2] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>6</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[5] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}>9</Heading>
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      {scoreLevel2?.[8] === 10 ? (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Right_Answer.png"
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Image
                          boxSize={{ sm: "30px", md: "40px" }}
                          src="./Wrong_Answer.png"
                          alt="Dan Abramov"
                        />
                      )}
                    </Center>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} border={"2px solid black"}>
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}></Heading>
                    </Center>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    border={"2px solid black"}
                    borderRadius={"0px 0px 8px 0px"}
                  >
                    <Center width={"full"} height={"full"}>
                      <Heading fontSize={{ sm: "20px", md: "23px" }}></Heading>
                    </Center>
                  </GridItem>
                </Grid>
              </HStack>
            )}
          </VStack>
        </VStack>
      </Center>
    </GridItem>
  );
}

export default Status;
