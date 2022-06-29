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
  FormErrorMessage,
  Link,
  Text,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import useClient from "./useClient";
import CustomSelect from "./components/CustomSelect";
import _ from "lodash";

export type FormDefinition = {
  umur: number | null;
  jenis_kelamin: "laki-laki" | "perempuan";
  NIP: number | null;
  nama: string;
  institusi: string;
  kota: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  page: number;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const formRef = useForm<FormDefinition>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
      umur: null,
      jenis_kelamin: "laki-laki",
      NIP: null,
      nama: "",
      institusi: "",
      kota: "",
      page: 1,
    },
  });

  const formDisclosure = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useClient();
  const toast = useToast();
  const formData = formRef.watch();
  const errors = formRef.formState.errors;
  const onSubmit = React.useCallback(
    async (data: FormDefinition) => {
      setIsLoading(true);
      try {
        const dataRegister = await client.register({
          confirmPassword: data.confirmPassword,
          email: data.email,
          password: data.password,
          username: data.username,
        });
        await client.updatePlayerData(
          {
            PlayFabId: dataRegister.data.PlayFabId,
            Data: {
              alreadyLevel2: "False",
              compliance: 0,
              dominance: 0,
              influence: 0,
              personality: 0,
              score: 0,
              steadiness: 0,
              totalQuestion: 0,
              level1: "False",
              missionData:
                "[false, false, false, false, false, false, false, false]",
            },
            Permission: "Private",
          },
          dataRegister.data.SessionTicket
        );
        await client.updatePlayerData(
          {
            PlayFabId: dataRegister.data.PlayFabId,
            Data: {
              nama: data.nama || "",
              umur: data.umur || null,
              jenis_kelamin: data.jenis_kelamin || "",
              NIP: data.NIP || null,
              institusi: data.institusi || "",
              kota: data.kota || "",
            },
            Permission: "Private",
          },
          dataRegister.data.SessionTicket
        );
        setIsLoading(false);
        toast({
          title: "Your account has been created successfully",
          status: "success",
          duration: 1000,
        });

        setTimeout(() => {
          Router.push("/login");
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
  console.log(formRef.formState.isSubmitted, formData.page);

  const handleNextForm = React.useCallback(() => {
    setTimeout(() => {
      formDisclosure.onOpen();
    }, 200);
    formRef.setValue("page", 2);
  }, [formDisclosure, formRef]);

  const handleBackToLogin = React.useCallback(() => {
    Router.push("/login");
  }, []);

  const handleBackToPreviousRegistration = React.useCallback(() => {
    setTimeout(() => {
      formDisclosure.onClose();
    }, 200);
    formRef.setValue("page", 1);
  }, [formRef, formDisclosure]);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 37) ||
        (evt.which > 40 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }
    },
    []
  );

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background.png"}
    >
      <Box
        width={"30vw"}
        bg="rgb(233,224,182)"
        borderRadius={"50px"}
        border={"11px solid white"}
        outline={"6px solid black"}
        outlineOffset={"-11px"}
        position={"relative"}
        padding={"40px"}
        backgroundPosition={"center"}
        backgroundImage={"./Artboard.png"}
        backgroundSize={"cover"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          {formData.page === 1 ? (
            <SlideFade in={!formDisclosure.isOpen} offsetX="20px" offsetY={0}>
              <VStack width={"inherit"} spacing={4}>
                <FormControl>
                  <FormLabel fontSize={"25px"}>Nama</FormLabel>
                  <Input
                    borderColor={"black"}
                    fontSize={"28px"}
                    outline={"5px solid black"}
                    _focus={{ border: "1px solid black" }}
                    _hover={{ border: "1px solid black" }}
                    backgroundColor={"white"}
                    size={"lg"}
                    {...formRef.register("nama")}
                  />
                </FormControl>
                <HStack width={"inherit"} spacing={"8"}>
                  <FormControl width={"50%"}>
                    <FormLabel fontSize={"25px"}>Umur</FormLabel>
                    <Input
                      borderColor={"black"}
                      fontSize={"28px"}
                      outline={"5px solid black"}
                      _focus={{ border: "1px solid black" }}
                      _hover={{ border: "1px solid black" }}
                      backgroundColor={"white"}
                      size={"lg"}
                      type={"number"}
                      onKeyDown={handleKeyDown}
                      {...formRef.register("umur")}
                    />
                  </FormControl>
                  <FormControl width={"50%"}>
                    <FormLabel fontSize={"25px"}>Jenis Kelamin</FormLabel>
                    <CustomSelect
                      options={[
                        { label: "Laki-laki", value: "laki-laki" },
                        { label: "Perempuan", value: "perempuan" },
                      ]}
                      value={{
                        label: _.upperFirst(formData.jenis_kelamin),
                        value: formData.jenis_kelamin,
                      }}
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel fontSize={"25px"}>NIP</FormLabel>
                  <Input
                    type={"number"}
                    borderColor={"black"}
                    fontSize={"28px"}
                    outline={"5px solid black"}
                    _focus={{ border: "1px solid black" }}
                    _hover={{ border: "1px solid black" }}
                    backgroundColor={"white"}
                    size={"lg"}
                    onKeyDown={handleKeyDown}
                    {...formRef.register("NIP")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"25px"}>Institusi</FormLabel>
                  <Input
                    borderColor={"black"}
                    fontSize={"28px"}
                    outline={"5px solid black"}
                    _focus={{ border: "1px solid black" }}
                    _hover={{ border: "1px solid black" }}
                    backgroundColor={"white"}
                    size={"lg"}
                    {...formRef.register("institusi")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"25px"}>Kota</FormLabel>
                  <Input
                    borderColor={"black"}
                    fontSize={"28px"}
                    outline={"5px solid black"}
                    _focus={{ border: "1px solid black" }}
                    _hover={{ border: "1px solid black" }}
                    backgroundColor={"white"}
                    size={"lg"}
                    {...formRef.register("kota")}
                  />
                </FormControl>
                <br />
              </VStack>
            </SlideFade>
          ) : (
            <SlideFade in={formDisclosure.isOpen} offsetX="20px" offsetY={0}>
              <VStack width={"inherit"} spacing={4}>
                <FormControl>
                  <FormLabel fontSize={"25px"}>Username</FormLabel>
                  <Input
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
          )}
          <HStack
            spacing={"14"}
            position={"absolute"}
            width={"100%"}
            justifyContent={"center"}
            bottom={"-4vh"}
            left={0}
          >
            <Button
              width={"35%"}
              onClick={
                formData.page === 1
                  ? handleBackToLogin
                  : handleBackToPreviousRegistration
              }
              height={"8vh"}
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
              {formData.page === 1 ? "Back" : "Previous"}
            </Button>
            <Button
              width={"35%"}
              type={formDisclosure.isOpen ? "submit" : undefined}
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
              isLoading={isLoading}
              onClick={formData.page === 1 ? handleNextForm : () => null}
            >
              {formData.page === 1 ? "Next" : "Register"}
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default Register;
