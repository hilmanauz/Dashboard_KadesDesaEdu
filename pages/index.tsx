import React from "react";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
import LandingPage from "../components/LandingPage";

const Home = () => {
  return (
    <Box width={"100vw"} height={"100vh"}>
      <LandingPage />
    </Box>
  );
};

// // @ts-ignore
// export const getServerSideProps: GetServerSideProps<{
//   dataLogin: any;
//   accountInfo: any;
//   error: any;
// }> = async (context) => {
//   try {
//     const SessionTicket = getCookie("SessionTicket", context) || "";
//     const PlayFabId = getCookie("PlayFabId", context) || "";
//     const dataLogin = await axios.post(
//       `https://${TitleId}.playfabapi.com/Client/GetUserData`,
//       {},
//       {
//         headers: {
//           "X-Authorization": SessionTicket,
//         },
//         withCredentials: true,
//       }
//     );
//     const accountInfo = await axios.post(
//       `https://${TitleId}.playfabapi.com/Client/GetAccountInfo`,
//       {
//         PlayFabId: PlayFabId,
//       },
//       {
//         headers: {
//           "X-Authorization": SessionTicket,
//           withCredentials: true,
//         },
//       }
//     );
//     return {
//       props: {
//         dataLogin: dataLogin.data?.data?.Data,
//         accountInfo: accountInfo.data?.data?.AccountInfo,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         // @ts-ignore
//         error: error.response.data,
//       },
//     };
//   }
// };

export default Home;
