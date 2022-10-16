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
} from "@chakra-ui/react";
import { deleteCookie, getCookie } from "cookies-next";
import Cookies from "js-cookie";
import _ from "lodash";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import CustomSelect, { SelectOption } from "../../components/CustomSelect";
import useClient from "../../engines/useClient";

export type FormDefinition = {
  umur: number | null;
  jenis_kelamin: "laki-laki" | "perempuan";
  NIP: number | null;
  nama: string;
  institusi: string;
  kota: string;
};

const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    (evt.which != 8 && evt.which != 0 && evt.which < 37) ||
    (evt.which > 40 && evt.which < 48) ||
    evt.which > 57
  ) {
    evt.preventDefault();
  }
};

function Form() {
  const formRef = useForm<FormDefinition>({
    defaultValues: {
      umur: null,
      jenis_kelamin: "laki-laki",
      NIP: null,
      nama: "",
      institusi: "",
      kota: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useClient();
  const userData = client.getUserData();
  const toast = useToast();
  const SessionTicket = getCookie("SessionTicket") as string;
  const PlayFabId = getCookie("PlayFabId");
  const formData = formRef.watch();
  const handleToLogin = React.useCallback(() => {
    deleteCookie("SessionTicket");
    deleteCookie("PlayFabId");
    Router.push("/login");
  }, []);
  const handleChangeGender = React.useCallback(
    (data: SelectOption) => {
      formRef.setValue("jenis_kelamin", data.value);
    },
    [formRef]
  );
  const onSubmit = React.useCallback(
    async (data: FormDefinition) => {
      setIsLoading(true);
      try {
        await client.updatePlayerData(
          {
            PlayFabId: PlayFabId,
            Data: {
              profile: `["${data.nama || ""}", "${data.umur || ""}", "${
                data.jenis_kelamin || ""
              }", "${data.NIP || ""}", "${data.institusi || ""}", "${
                data.kota || ""
              }"]`,
            },
            Permission: "Private",
          },
          SessionTicket || ""
        );
        toast({
          title: "Your information data has been updated successfully",
          status: "success",
          duration: 2000,
        });

        if (userData.data?.accountInfo) Router.push("/");
        else Router.push("/login");
      } catch (error: any) {
        toast.closeAll();
        setIsLoading(false);
        toast({
          title: error.response.data.errorMessage,
          status: "error",
          duration: 1000,
        });
      }
    },
    [client, toast, SessionTicket, PlayFabId, userData.data]
  );
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
        padding={"40px"}
        backgroundPosition={"center"}
        backgroundImage={"../Artboard.png"}
        backgroundSize={"cover"}
      >
        <form onSubmit={formRef.handleSubmit(onSubmit)}>
          <SlideFade in={true} offsetX="20px" offsetY={0}>
            <VStack width={"inherit"} spacing={4}>
              <FormControl>
                <FormLabel fontSize={{ md: "25px", sm: "20px" }}>
                  Nama
                </FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={{ md: "28px", sm: "23px" }}
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
                  <FormLabel fontSize={{ md: "25px", sm: "20px" }}>
                    Umur
                  </FormLabel>
                  <Input
                    flex={1}
                    borderColor={"black"}
                    fontSize={{ md: "28px", sm: "23px" }}
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
                  <FormLabel
                    fontSize={{ md: "25px", sm: "18px" }}
                    noOfLines={1}
                  >
                    Jenis Kelamin
                  </FormLabel>
                  <CustomSelect
                    options={[
                      { label: "Laki-laki", value: "laki-laki" },
                      { label: "Perempuan", value: "perempuan" },
                    ]}
                    value={{
                      label: _.upperFirst(formData.jenis_kelamin),
                      value: formData.jenis_kelamin,
                    }}
                    onChange={handleChangeGender}
                    style={{ flex: 1 }}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel fontSize={{ md: "25px", sm: "20px" }}>NIP</FormLabel>
                <Input
                  flex={1}
                  type={"number"}
                  borderColor={"black"}
                  fontSize={{ md: "28px", sm: "23px" }}
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
                <FormLabel fontSize={{ md: "25px", sm: "20px" }}>
                  Institusi
                </FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={{ md: "28px", sm: "23px" }}
                  outline={"5px solid black"}
                  _focus={{ border: "1px solid black" }}
                  _hover={{ border: "1px solid black" }}
                  backgroundColor={"white"}
                  size={"lg"}
                  {...formRef.register("institusi")}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={{ md: "25px", sm: "20px" }}>
                  Kota
                </FormLabel>
                <Input
                  flex={1}
                  borderColor={"black"}
                  fontSize={{ md: "28px", sm: "23px" }}
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
              Cancel
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
              Register
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default Form;
