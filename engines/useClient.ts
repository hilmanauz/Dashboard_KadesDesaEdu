import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import Cookies from 'js-cookie';
import { RegisterForm } from "../pages/register";
import { LoginForm } from "../pages";

const TitleId = "76C22";


type LoginInstance = {
  EntityToken: { EntityToken: string; TokenExpiration: string, Entity: { Id: string } }
  LastLoginTime: string;
  NewlyCreated: boolean;
  PlayFabId: string;
  SessionTicket: string;
}

export default function useClient() {
  return {
    register: async (data: RegisterForm) => {
      const dataRegister = await axios.post(
        `https://${TitleId}.playfabapi.com/Client/RegisterPlayFabUser`,
        { ...data, "TitleId": TitleId }
      );
      await axios.post(
        `https://${TitleId}.playfabapi.com/Client/UpdateUserTitleDisplayName`,
        {
          displayName: dataRegister.data.data.Username
        },
        {
          headers: {
            "X-Authorization": dataRegister.data.data.SessionTicket
          }
        }
      );
      return dataRegister.data as AxiosResponse<LoginInstance, any>;
    },
    login: async (data: LoginForm) => {
      const dataLogin = await axios.post(
        `https://${TitleId}.playfabapi.com/Client/LoginWithPlayFab`,
        { ...data, "TitleId": TitleId }
      );
      return dataLogin.data as AxiosResponse<LoginInstance, any>;
    },
    validateEntityToken: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR(["validate", axios], async () => {
        try {
          const EntityToken = Cookies.get("EntityToken");
          const entityData = await axios.post(
            `https://${TitleId}.playfabapi.com/Authentication/ValidateEntityToken`,
            { EntityToken: EntityToken || "" },
            {
              headers: {
                "X-EntityToken": EntityToken || "",
              },
            }
          );
          return entityData.data;
        } catch (error) {
          // @ts-ignore
          return error.response;
        }
      }, { revalidateOnReconnect: true, revalidateOnFocus: true, revalidateOnMount: true, refreshWhenOffline: true, refreshInterval: 1000, refreshWhenHidden: true });
    },
    getEntityToken: async () => {
      const dataLogin = await axios.post(
        `https://${TitleId}.playfabapi.com/Authentication/GetEntityToken`,
        {},
        {
          headers: {
            "X-SecretKey": "GBKCPMWQYBWNFB9O4W9TH7386KFJUDXGWDWGSHGNADMRUMO3OP",
          }
        }
      );
      return dataLogin.data as AxiosResponse<any>;
    },
    getUserData: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR(["getData"], async () => {
        const SessionTicket = Cookies.get("SessionTicket") || "";
        const PlayFabId = Cookies.get("PlayFabId") || "";
        const dataLogin = await axios.post(
          `https://${TitleId}.playfabapi.com/Client/GetUserData`,
          {},
          {
            headers: {
              "X-Authorization": SessionTicket
            }
          }
        );
        const accountInfo = await axios.post(
          `https://${TitleId}.playfabapi.com/Client/GetAccountInfo`,
          {
            PlayFabId: PlayFabId
          },
          {
            headers: {
              "X-Authorization": SessionTicket
            }
          }
        );
        return { dataLogin: dataLogin.data?.data?.Data, accountInfo: accountInfo.data?.data?.AccountInfo };
      })
    },
    updatePlayerData: async (data: any, SessionTicket: string) => {
      await axios.post(
        `https://${TitleId}.playfabapi.com/Client/UpdateUserData`,
        data,
        {
          headers: {
            "X-Authorization": SessionTicket
          }
        }
      );
    }
  }
}