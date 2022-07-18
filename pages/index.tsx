import type { NextPage } from "next";
import React from "react";
import { Center, Grid } from "@chakra-ui/react";
import Router from "next/router";
import Cookies from "js-cookie";
import _ from "lodash";
import useClient from "../engines/useClient";
import NilaiAkhir from "../components/NilaiAkhir";
import Profile from "../components/Profile";
import Status from "../components/Status";

export type LoginForm = {
  username: string;
  password: string;
};

const Home: NextPage = () => {
  const client = useClient();
  const validateToken = client.validateEntityToken();
  const userData = client.getUserData();
  const EntityToken = Cookies.get("EntityToken");
  React.useEffect(() => {
    if (validateToken.data && userData.error && userData.data) return;
    if ((validateToken.data?.data?.error && !EntityToken) || userData.error)
      Router.push("/login");
  }, [validateToken, EntityToken, userData.error, userData.data]);

  if (!userData.data) return <></>;

  return (
    <Center
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
      backgroundImage={"./Background.png"}
    >
      <Grid
        height={"90%"}
        width={"90%"}
        templateRows="repeat(15, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={10}
      >
        <Profile userData={userData} />
        <Status userData={userData} />
        <NilaiAkhir userData={userData} />
      </Grid>
      {/* {JSON.stringify(userData.data)} */}
    </Center>
  );
};

export default Home;
