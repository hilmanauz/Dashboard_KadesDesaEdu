import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
  Image,
  useBreakpointValue,
  Checkbox,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginForm } from "./dashboard";
import Router from "next/router";
import useClient from "../engines/useClient";
import { deleteCookie, setCookie } from "cookies-next";

function Login() {
  const formRef = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const client = useClient();
  const toast = useToast();

  const onSubmit = React.useCallback(
    async (data: LoginForm) => {
      setIsLoading(true);
      try {
        const dataLogin = await client.login(data);
        if (dataLogin.data) {
          const entityToken = await client.getEntityToken();
          deleteCookie("PlayFabId");
          deleteCookie("SessionTicket");
          setCookie("EntityToken", entityToken.data.EntityToken);
          setCookie("SessionTicket", dataLogin.data.SessionTicket);
          setCookie("PlayFabId", dataLogin.data.PlayFabId);
          setCookie("EntityId", dataLogin.data.EntityToken.Entity.Id);
        }
        toast({
          title: "Login successfull",
          status: "success",
          duration: 2000,
        });

        Router.push("/");
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
    [client, toast]
  );

  const handleMoveToRegisterPage = React.useCallback(() => {
    Router.push("/registers/account");
  }, []);

  const isMobile = useBreakpointValue({ sm: true, md: false });

  return (
    <Center
      flexDirection={"column"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background_Login.png"}
    >
      <Box
        width={{ sm: "100vw", md: "650px" }}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
      >
        <Link href={"/"}>
          <Image
            src="./Logo.png"
            alt="Dan Abramov"
            width={"full"}
            cursor={"pointer"}
          />
        </Link>
      </Box>
      <br />
      <br />
      <Box
        bg="rgb(233,224,182)"
        borderRadius={"50px"}
        border={"11px solid white"}
        outline={"6px solid black"}
        outlineOffset={"-11px"}
        position={"relative"}
        padding={{ sm: "25px", md: "50px" }}
        backgroundPosition={"center"}
        backgroundImage={"./Artboard.png"}
        backgroundSize={"cover"}
        width={{ sm: "90vw", md: "600px" }}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <FormControl
            display={"flex"}
            flexDirection={{ sm: "column", md: "row" }}
          >
            <FormLabel fontSize={{ sm: "1.5rem", md: "2rem" }}>
              Username
            </FormLabel>
            <Input
              {...formRef.register("username")}
              borderColor={"black"}
              marginX={{ sm: 0, md: "15px" }}
              fontSize={{ sm: "1.5rem", md: "2rem" }}
              outline={"5px solid black"}
              _focus={{ border: "1px solid black" }}
              _hover={{ border: "1px solid black" }}
              backgroundColor={"white"}
              size={"lg"}
            />
          </FormControl>
          <br />
          <FormControl
            display={"flex"}
            flexDirection={{ sm: "column", md: "row" }}
          >
            <FormLabel fontSize={{ sm: "1.5rem", md: "2rem" }}>
              Password
            </FormLabel>
            <Input
              {...formRef.register("password")}
              type={"password"}
              borderColor={"black"}
              marginX={{ sm: 0, md: "15px" }}
              fontSize={{ sm: "1.5rem", md: "2rem" }}
              outline={"5px solid black"}
              _focus={{ border: "1px solid black" }}
              _hover={{ border: "1px solid black" }}
              backgroundColor={"white"}
              size={"lg"}
            />
          </FormControl>
          <br />
          <HStack paddingLeft={"20px"}>
            <Checkbox colorScheme="green" borderColor={"black"} size={"lg"}>
              <Heading size={"xs"}>Remember me</Heading>
            </Checkbox>
            <Spacer />
            <Link color="green" href="forgot-password">
              <Heading size={"xs"}>Forgot password?</Heading>
            </Link>
          </HStack>
          <br />
          {isMobile && <br />}
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
              type="submit"
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
              isLoading={isLoading}
              display={"flex"}
            >
              Login
            </Button>
            <Button
              width={{ md: "35%", sm: "40%" }}
              height={"full"}
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
              fontSize={{ sm: "xl", md: "3xl" }}
              color={"white"}
              display={"flex"}
              onClick={handleMoveToRegisterPage}
            >
              Register
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
