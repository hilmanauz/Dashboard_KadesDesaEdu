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
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginForm } from ".";
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

  return (
    <Center
      flexDirection={"column"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background.png"}
    >
      <Box
        width={"650px"}
        backgroundImage={"./Back_logo.png"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
      >
        <Image src="./Front_logo.png" alt="Dan Abramov" width={"full"} />
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
        padding={"50px"}
        backgroundPosition={"center"}
        backgroundImage={"./Artboard.png"}
        backgroundSize={"cover"}
        width={"600px"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <FormControl display={"flex"}>
            <FormLabel fontSize={"2rem"}>Username</FormLabel>
            <Input
              {...formRef.register("username")}
              borderColor={"black"}
              marginX={"15px"}
              fontSize={"2rem"}
              outline={"5px solid black"}
              _focus={{ border: "1px solid black" }}
              _hover={{ border: "1px solid black" }}
              backgroundColor={"white"}
              size={"lg"}
            />
          </FormControl>
          <br />
          <FormControl display={"flex"}>
            <FormLabel fontSize={"2rem"}>Password</FormLabel>
            <Input
              {...formRef.register("password")}
              type={"password"}
              borderColor={"black"}
              marginX={"15px"}
              fontSize={"2rem"}
              outline={"5px solid black"}
              _focus={{ border: "1px solid black" }}
              _hover={{ border: "1px solid black" }}
              backgroundColor={"white"}
              size={"lg"}
            />
          </FormControl>
          <br />
          <HStack
            spacing={"14"}
            position={"absolute"}
            width={"100%"}
            justifyContent={"center"}
            bottom={"-3vh"}
            left={0}
            height={{ lg: "80px", md: "75px" }}
          >
            <Button
              width={"35%"}
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
              fontSize={"3xl"}
              color={"white"}
              isLoading={isLoading}
              display={"flex"}
            >
              Login
            </Button>
            <Button
              width={"35%"}
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
              fontSize={"3xl"}
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
