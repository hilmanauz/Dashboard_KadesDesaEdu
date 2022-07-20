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
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import _ from "lodash";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import useClient from "../../engines/useClient";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Account() {
  const formRef = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useClient();
  const toast = useToast();
  const formData = formRef.watch();
  const errors = formRef.formState.errors;
  const handleBackToLogin = React.useCallback(() => {
    Router.push("/login");
  }, []);
  const onSubmit = React.useCallback(
    async (data: RegisterForm) => {
      setIsLoading(true);
      try {
        const dataRegister = await client.register({
          confirmPassword: data.confirmPassword,
          email: data.email,
          password: data.password,
          username: data.username,
        });
        Cookies.set("SessionTicket", dataRegister.data.SessionTicket);
        Cookies.set("PlayFabId", dataRegister.data.PlayFabId);
        setIsLoading(false);
        toast({
          title: "Your account has been created successfully",
          status: "success",
          duration: 1000,
        });
        setTimeout(() => {
          Router.push("/registers/form");
        }, 1000);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          title: error.response.data.errorMessage,
          status: "error",
          duration: 1000,
        });
      }
    },
    [client, toast]
  );

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"../Background.png"}
    >
      <Box
        width={"650px"}
        bg="rgb(233,224,182)"
        borderRadius={"50px"}
        border={"11px solid white"}
        outline={"6px solid black"}
        outlineOffset={"-11px"}
        position={"relative"}
        padding={"40px"}
        backgroundPosition={"center"}
        backgroundImage={"../Artboard.png"}
        backgroundSize={"cover"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <SlideFade in={true} offsetX="20px" offsetY={0}>
            <VStack width={"inherit"} spacing={4}>
              <FormControl>
                <FormLabel fontSize={"25px"}>Username</FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={"28px"}
                  outlineOffset={"-2px"}
                  outline={`5px solid ${errors.username ? "red" : "black"}`}
                  _focus={{ border: "1px solid black" }}
                  _hover={{ border: "1px solid black" }}
                  backgroundColor={"white"}
                  size={"lg"}
                  {...formRef.register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <Text
                    fontSize={"0.875rem"}
                    marginTop={"0.5rem"}
                    lineHeight={"normal"}
                    color={"red"}
                  >
                    {errors.username.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"25px"}>E-mail</FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={"28px"}
                  outlineOffset={"-2px"}
                  outline={`5px solid ${errors.email ? "red" : "black"}`}
                  _focus={{ border: "1px solid black" }}
                  _hover={{ border: "1px solid black" }}
                  backgroundColor={"white"}
                  size={"lg"}
                  type={"email"}
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
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"25px"}>Password</FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={"28px"}
                  outlineOffset={"-2px"}
                  outline={`5px solid ${errors.password ? "red" : "black"}`}
                  _focus={{ border: "1px solid black" }}
                  _hover={{ border: "1px solid black" }}
                  backgroundColor={"white"}
                  size={"lg"}
                  {...formRef.register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  type={"password"}
                />
                {errors.password && (
                  <Text
                    fontSize={"0.875rem"}
                    marginTop={"0.5rem"}
                    lineHeight={"normal"}
                    color={"red"}
                  >
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword ? true : false}>
                <FormLabel fontSize={"25px"}>Confirm password</FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={"28px"}
                  outlineOffset={"-2px"}
                  outline={`5px solid ${
                    errors.confirmPassword ? "red" : "black"
                  }`}
                  _focus={{ border: "1px solid black" }}
                  _hover={{ border: "1px solid black" }}
                  backgroundColor={"white"}
                  size={"lg"}
                  {...formRef.register("confirmPassword", {
                    validate: (value) =>
                      value === formData.password ||
                      "The passwords do not match",
                  })}
                  type={"password"}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <br />
            </VStack>
          </SlideFade>
          <HStack
            spacing={"14"}
            position={"absolute"}
            width={"100%"}
            justifyContent={"center"}
            bottom={{ lg: "-4vh", md: "-3vh" }}
            left={0}
            height={{ lg: "80px", md: "70px" }}
          >
            <Button
              width={"35%"}
              onClick={handleBackToLogin}
              height={"full"}
              variant={"unstyled"}
              borderRadius={"24px"}
              border={"8px solid white"}
              outline={"5px solid black"}
              outlineOffset={"-9px"}
              background={
                "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)"
              }
              _hover={{
                background:
                  "radial-gradient(300px 65px at bottom center, rgba(30,117,187,1) 80%, rgba(98,159,208,1) 90%, rgba(98,159,208,1) 100%)",
              }}
              fontSize={"3xl"}
              color={"white"}
              display={"flex"}
            >
              Cancel
            </Button>
            <Button
              width={"35%"}
              type={"submit"}
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
              isLoading={isLoading}
            >
              Register
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default Account;
