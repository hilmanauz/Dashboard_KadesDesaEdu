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
import Cookies from "js-cookie";
import useClient from "../engines/useClient";

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
          Cookies.remove("PlayFabId");
          Cookies.remove("SessionTicket");
          Cookies.set("EntityToken", entityToken.data.EntityToken);
          Cookies.set("SessionTicket", dataLogin.data.SessionTicket);
          Cookies.set("PlayFabId", dataLogin.data.PlayFabId);
          Cookies.set("EntityId", dataLogin.data.EntityToken.Entity.Id);
        }
        setIsLoading(false);
        toast({
          title: "Login successfull",
          status: "success",
          duration: 1000,
        });

        setTimeout(() => {
          Router.push("/");
        }, 1000);
      } catch (error: any) {
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
    Router.push("/register");
  }, []);

  return (
    <VStack
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background.png"}
    >
      <br />
      <br />
      <Box
        width={"38vw"}
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
        width={"35vw"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <FormControl display={"flex"}>
            <FormLabel fontSize={"28px"}>Username</FormLabel>
            <Input
              {...formRef.register("username")}
              borderColor={"black"}
              marginX={"15px"}
              fontSize={"30px"}
              outline={"5px solid black"}
              _focus={{ border: "1px solid black" }}
              _hover={{ border: "1px solid black" }}
              backgroundColor={"white"}
              size={"lg"}
            />
          </FormControl>
          <br />
          <FormControl display={"flex"}>
            <FormLabel fontSize={"28px"}>Password</FormLabel>
            <Input
              {...formRef.register("password")}
              type={"password"}
              borderColor={"black"}
              marginX={"15px"}
              fontSize={"30px"}
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
          >
            <Button
              width={"35%"}
              height={"8vh"}
              type="submit"
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
              height={"8vh"}
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
    </VStack>
  );
}

export default Login;
