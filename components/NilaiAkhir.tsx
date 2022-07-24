import {
  GridItem,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import _ from "lodash";
import React from "react";
import { SWRResponse } from "swr";

const percentageCount = (value: number) => Math.round((value / 24) * 100);

function NilaiAkhir({
  userData,
}: {
  userData: {
    dataLogin: any;
    accountInfo: any;
  };
}) {
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

  const personalityResult = React.useMemo(() => {
    if (!personalityLevelPercentage) return;
    return _.sortBy(personalityLevelPercentage, [
      function ([key, value]) {
        return value.value;
      },
    ]).reverse()[0];
  }, [personalityLevelPercentage]);

  return (
    <GridItem
      colSpan={2}
      rowSpan={8}
      bg="rgb(233,224,182)"
      borderRadius={"50px"}
      border={"11px solid white"}
      outline={"6px solid black"}
      outlineOffset={"-11px"}
      position={"relative"}
      backgroundImage={"./Artboard.png"}
      backgroundSize={"cover"}
    >
      <Center height={"100%"} paddingX={"20px"} paddingTop={"20px"}>
        <Box
          position={"absolute"}
          top={{ md: -5, lg: -8 }}
          left={0}
          right={0}
          textAlign={"center"}
        >
          <Box
            width={"fit-content"}
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
            <Heading
              color={"white"}
              paddingInline={"2vw"}
              fontSize={{ base: "1.5vw", md: "2.2vw", lg: "2.2vw" }}
            >
              Nilai Akhir
            </Heading>
          </Box>
        </Box>
        <VStack justifyContent={"center"}>
          {userData.dataLogin.level1.Value === "False" ? (
            <Center boxSize={"75%"}>
              <Image src={"./Empty_state.png"} alt="Dan Abramov" />
            </Center>
          ) : (
            <VStack height={"100%"} width={"100%"}>
              <Center flexDirection={"column"}>
                <Heading fontSize={{ base: "0.5vw", md: "1.5vw", lg: "1.5vw" }}>
                  Nilai akhir anda adalah
                </Heading>
              </Center>
              <HStack flex={1} height={"full"} width={"full"}>
                <Center width={"25%"} height={"full"}>
                  <Image
                    src={`./Personality_${personalityResult?.[0]}.png`}
                    width={"full"}
                    alt="Dan Abramov"
                    objectFit={"cover"}
                  />
                </Center>
                <VStack width={"72%"}>
                  <Heading
                    fontSize={{ base: "0.5vw", md: "1.4vw", lg: "1.5vw" }}
                    letterSpacing={"0.3px"}
                  >
                    DISC Personality: {personalityResult?.[1].title}
                  </Heading>
                  <Text
                    height={"full"}
                    fontSize={{ base: "0.8vw", md: "1.1vw", lg: "1.1vw" }}
                    css={css`
                      @media only screen and (min-width: 1280px) and (max-width: 1440px) {
                        font-size: 1vw;
                        font-weight: 500;
                        line-height: 1.5;
                      }
                    `}
                    letterSpacing={"0.3px"}
                    textAlign={"justify"}
                    lineHeight={{ base: "6", md: "tall", lg: "6" }}
                  >
                    {personalityResult?.[1].description}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          )}
        </VStack>
      </Center>
    </GridItem>
  );
}

export default NilaiAkhir;
