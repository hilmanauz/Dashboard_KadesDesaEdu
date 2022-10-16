import {
  Center,
  Box,
  SlideFade,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  FormErrorMessage,
  Button,
  Text,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { deleteCookie, getCookie } from "cookies-next";
import Cookies from "js-cookie";
import _ from "lodash";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import CustomSelect, { SelectOption } from "../components/CustomSelect";
import useClient from "../engines/useClient";

function ForgotPassword() {
  const formRef = useForm({
    defaultValues: {
      email: "",
    },
  });
  const client = useClient();
  const toast = useToast();
  const errors = formRef.formState.errors;
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = React.useCallback(
    async (data: { email: string }) => {
      setIsLoading(true);
      try {
        await client.forgot(data.email);
        toast({
          title:
            "An account recovery email has been sent to the player's email address.",
          status: "success",
          duration: 2000,
        });
      } catch (error: any) {
        toast.closeAll();
        setIsLoading(false);
        toast({
          title: error?.response.data?.errorMessage,
          status: "error",
          duration: 1000,
        });
      }
    },
    [toast, client]
  );
  const handleToLogin = React.useCallback(() => {
    Router.push("/login");
  }, []);
  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"../Background_Login.png"}
    >
      <Box
        width={{ sm: "95%", md: "650px" }}
        bg="rgb(233,224,182)"
        borderRadius={"50px"}
        border={"11px solid white"}
        outline={"6px solid black"}
        outlineOffset={"-11px"}
        position={"relative"}
        padding={{ sm: "40px", md: "50px" }}
        backgroundPosition={"center"}
        backgroundImage={"../Artboard.png"}
        backgroundSize={"cover"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <SlideFade in={true} offsetX="20px" offsetY={0}>
            <VStack alignItems={"normal"} width={"inherit"} spacing={4}>
              <Heading>Forgot Password</Heading>
              <Text
                fontSize={{ md: "16px", sm: "16px" }}
                letterSpacing={"0.5px"}
              >
                Please confirm your email:
              </Text>
              <Input
                flex={1}
                borderColor={"black"}
                type={"email"}
                fontSize={{ md: "25px", sm: "25px" }}
                outline={"5px solid black"}
                placeholder={"johndoe@mail.com"}
                _focus={{ border: "1px solid black" }}
                _hover={{ border: "1px solid black" }}
                backgroundColor={"white"}
                size={"lg"}
                {...formRef.register("email", {
                  required: "E-mail is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Text
                  fontSize={"0.875rem"}
                  marginTop={"0.5rem"}
                  lineHeight={"normal"}
                  color={"red"}
                >
                  {errors.email.message}
                </Text>
              )}
              <Text
                fontSize={{ md: "16px", sm: "16px" }}
                letterSpacing={"0.5px"}
              >
                An e-mail with a link to a page where you can reset your
                password will be sent. Note that the e-mail might take a few
                minutes to reach your inbox.
              </Text>
              <br />
            </VStack>
          </SlideFade>
          <HStack
            spacing={{ md: "14", sm: "5" }}
            position={"absolute"}
            width={"100%"}
            justifyContent={"center"}
            bottom={{ md: "-3vh", sm: "-4vh" }}
            left={0}
            height={{ lg: "80px", md: "75px", sm: "70px" }}
          >
            <Button
              width={{ md: "35%", sm: "40%" }}
              height={"full"}
              variant={"unstyled"}
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
              fontSize={{ sm: "xl", md: "3xl" }}
              color={"white"}
              display={"flex"}
              onClick={handleToLogin}
            >
              Back
            </Button>
            <Button
              width={{ md: "35%", sm: "40%" }}
              type="submit"
              height={"full"}
              variant={"unstyled"}
              borderRadius={"24px"}
              isLoading={isLoading}
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
              fontSize={{ sm: "xl", md: "3xl" }}
              color={"white"}
              display={"flex"}
            >
              Send
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default ForgotPassword;
