import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { Center, Grid, useBreakpointValue } from "@chakra-ui/react";
import Router from "next/router";
import _ from "lodash";
import useClient, { TitleId } from "../engines/useClient";
import NilaiAkhir from "../components/NilaiAkhir";
import Profile from "../components/Profile";
import Status from "../components/Status";
import axios from "axios";
import { getCookie } from "cookies-next";

export type LoginForm = {
  username: string;
  password: string;
};

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const client = useClient();
  const validateToken = client.validateEntityToken();
  const EntityToken = getCookie("EntityToken");
  React.useEffect(() => {
    if ((validateToken.data?.data?.error && !EntityToken) || !props.dataLogin)
      Router.push("/");
    else if (!props.dataLogin?.profile) Router.push("/registers/form");
  }, [
    validateToken,
    EntityToken,
    props.accountInfo,
    props.dataLogin,
    props.error,
  ]);
  const isMobile = useBreakpointValue({ sm: true, md: false });

  if (!props.dataLogin?.profile) return <></>;

  return (
    <Center
      width={"100vw"}
      height={{ lg: "100vh", sm: "auto" }}
      position={"relative"}
      backgroundImage={"../Background.png"}
    >
      <Grid
        height={{ lg: "100%", sm: "auto" }}
        paddingY={{ md: "3%", sm: "6%" }}
        width={"90%"}
        overflowY={{ sm: "auto", lg: "unset" }}
        templateRows={{ lg: "repeat(15, 1fr)", sm: "repeat(20, 1fr)" }}
        templateColumns={{ lg: "repeat(5, 1fr)", sm: "repeat(1, 1fr)" }}
        gap={{ lg: 10, md: 8, sm: 6 }}
      >
        <Profile userData={props} />
        <Status userData={props} />
        <NilaiAkhir userData={props} />
      </Grid>
    </Center>
  );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps<{
  dataLogin: any;
  accountInfo: any;
  error: any;
}> = async (context) => {
  try {
    const SessionTicket = getCookie("SessionTicket", context) || "";
    const PlayFabId = getCookie("PlayFabId", context) || "";
    const dataLogin = await axios.post(
      `https://${TitleId}.playfabapi.com/Client/GetUserData`,
      {},
      {
        headers: {
          "X-Authorization": SessionTicket,
        },
        withCredentials: true,
      }
    );
    const accountInfo = await axios.post(
      `https://${TitleId}.playfabapi.com/Client/GetAccountInfo`,
      {
        PlayFabId: PlayFabId,
      },
      {
        headers: {
          "X-Authorization": SessionTicket,
          withCredentials: true,
        },
      }
    );
    return {
      props: {
        dataLogin: dataLogin.data?.data?.Data,
        accountInfo: accountInfo.data?.data?.AccountInfo,
      },
    };
  } catch (error) {
    return {
      props: {
        // @ts-ignore
        error: error.response.data,
      },
    };
  }
};

export default Home;
