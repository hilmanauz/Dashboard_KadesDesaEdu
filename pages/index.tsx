import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { Center, Grid } from "@chakra-ui/react";
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
    if (!props.dataLogin.profile) Router.push("/registers/form");
    if (validateToken.data?.data?.error && !EntityToken) Router.push("/login");
  }, [validateToken, EntityToken, props.accountInfo, props.dataLogin]);

  if (!props.dataLogin.profile) return <></>;

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"../Background.png"}
    >
      <Grid
        height={"90%"}
        width={"90%"}
        templateRows="repeat(15, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={{ lg: 10, md: 6 }}
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
