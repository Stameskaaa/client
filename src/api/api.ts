import {
  UserData,
  UserDataInnerList,
  Messages,
  Message,
  ResponseFromChangeFriends,
} from './../types/interfaces';
import axios, { AxiosResponse } from 'axios';

const src = process.env.REACT_APP_SRC;

interface ImageObject {
  file?: {
    buffer: string;
  }[];
}

type UnionFileString = string | ImageObject;

interface ModifiedDB {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedId: any;
}

const getUser = async (name: string): Promise<UserData | null> => {
  try {
    const response: AxiosResponse<UserData[]> = await axios.get(`${src}/getuser?name=${name}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserList = async (name: string, type: string): Promise<UserData[]> => {
  const response: AxiosResponse<UserData[]> = await axios.get(
    `${src}/getuserlist?name=${name}&type=${type.toLowerCase()}`,
  );

  if (Array.isArray(response.data)) {
    return response.data.filter((v) => v);
  } else {
    return [];
  }
};

const addFriend = async (
  log: string,
  log2: string,
): Promise<AxiosResponse<ResponseFromChangeFriends>> => {
  try {
    const response: AxiosResponse<ResponseFromChangeFriends> = await axios.patch(
      `${src}/addfriend?name=${log}`,
      {
        user: log2,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cancelSub = async (
  log: string,
  log2: string,
): Promise<AxiosResponse<ResponseFromChangeFriends>> => {
  try {
    const response: AxiosResponse<ResponseFromChangeFriends> = await axios.patch(
      `${src}/cancelsub?name=${log}`,
      {
        user: log2,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletefriend = async (
  log: string,
  log2: string,
): Promise<AxiosResponse<ResponseFromChangeFriends>> => {
  try {
    const response: AxiosResponse<ResponseFromChangeFriends> = await axios.patch(
      `${src}/deletefriend?name=${log}`,
      {
        user: log2,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const subscribe = async (
  log: string,
  log2: string,
): Promise<AxiosResponse<ResponseFromChangeFriends>> => {
  try {
    const response: AxiosResponse<ResponseFromChangeFriends> = await axios.patch(
      `${src}/subscribe?name=${log}`,
      {
        user: log2,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkdependence = async (
  log: string,
  log2: string,
): Promise<AxiosResponse<string> | undefined> => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `${src}/checkdependence?log=${log}&log2=${log2}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const uploadMessage = async (name: string): Promise<AxiosResponse<string>> => {
  return axios.post(
    `${src}/uploadmessage`,
    { user: name },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
};

const getUserChats = async (name: string): Promise<AxiosResponse<Messages[] | string>> => {
  const response: AxiosResponse<Messages[] | string> = await axios.get(
    `${src}/getuserchats?name=${name}`,
  );

  return response;
};

const getPhotos = async (name: string): Promise<AxiosResponse<UnionFileString[]>> => {
  const response: AxiosResponse<UnionFileString[]> = await axios.get(
    `${src}/getphotos?name=${name}`,
  );
  return response;
};

const uploadChat = async (log: string, log2: string): Promise<AxiosResponse<string>> => {
  const response: AxiosResponse<string> = await axios.get(
    `${src}/uploadchat?log1=${log}&log2=${log2}`,
  );
  return response;
};

const getPersonalMessage = async (
  firstUser: string,
  secondUser: string,
): Promise<AxiosResponse<Messages>> => {
  const response: AxiosResponse<Messages> = await axios.post(
    `${src}/personalMessage`,
    { firstUserData: firstUser, secondUserData: secondUser },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response;
};

const sendMessage = async (
  firstUser: string,
  secondUser: string,
  value: string,
  currentTime: string,
): Promise<AxiosResponse<string>> => {
  const data: AxiosResponse<string> = await axios.post(
    `${src}/sendMessage`,
    {
      firstUserData: firstUser,
      secondUserData: secondUser,
      message: { user: firstUser, message: value, time: currentTime, status: 'read' },
    },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return data;
};

const getAllUsers = async (name: string): Promise<AxiosResponse<UserDataInnerList[]>> => {
  const request: AxiosResponse<UserDataInnerList[]> = await axios.get(
    `${src}/getallusers?first=${name}`,
  );

  return request;
};

const sendPost = async (formData: FormData): Promise<AxiosResponse<ModifiedDB>> => {
  const request: AxiosResponse<ModifiedDB> = await axios.post(
    `${src}/sendPost`,

    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return request;
};

const sendPhoto = async (
  formData: FormData,
): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
  const request: AxiosResponse<{ success: boolean; message: string }> = await axios.post(
    `${src}/sendPhoto`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return request;
};

const loginUser = async (log: string, pass: string): Promise<AxiosResponse<[UserData]>> => {
  const request: AxiosResponse<[UserData]> = await axios.post(
    `${src}/loginUser`,
    {
      log,
      pass,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  console.log(request);

  return request;
};

const registration = async (regAcc: { [key: string]: string }): Promise<AxiosResponse<string>> => {
  const response: AxiosResponse<string> = await axios.post(
    `${src}/registrationUser`,
    {
      ...regAcc,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s',
      friends: [''],
      subscriber: [''],
      subscribed: [''],
      gender: 'unknown',
      birthDate: 'unknown',
      martialStatus: 'unknown',
      location: 'unknown',
      photos: [''],
      status: 'offline',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response;
};

const changeProfileData = async (
  profileDataObj: { [key: string]: string },
  name: string,
): Promise<AxiosResponse<ModifiedDB>> => {
  const request: AxiosResponse<ModifiedDB> = await axios.post(
    `${src}/changeprofiledata`,
    {
      profileDataObj,
      name,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return request;
};

const deleteMessages = async (
  log: string,
  log2: string,
  arrayIndexes: number[],
): Promise<AxiosResponse<{ data: [Message]; text: string }>> => {
  const response: AxiosResponse<{ data: [Message]; text: string }> = await axios.post(
    `${src}/deleteMessages?log1=${log}&log2=${log2}`,
    { arrayIndexes },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response;
};

const editMessage = async (
  log: string,
  log2: string,
  objectInfo: { indexToEdit: number; message: string },
): Promise<AxiosResponse<{ data: [Message]; text: string }>> => {
  const response: AxiosResponse<{ data: [Message]; text: string }> = await axios.post(
    `${src}/editMessage?log1=${log}&log2=${log2}`,
    { objectInfo },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return response;
};

const sendStatus = async (status: string, name: string) => {
  const request: AxiosResponse<{ data: ModifiedDB; text: string }> = await axios.get(
    `${src}/sendstatus?status=${status}&name=${name}`,
  );

  return request;
};

export {
  changeProfileData,
  sendStatus,
  editMessage,
  deleteMessages,
  getUserList,
  getUser,
  addFriend,
  cancelSub,
  deletefriend,
  subscribe,
  uploadMessage,
  checkdependence,
  getUserChats,
  getPhotos,
  uploadChat,
  getPersonalMessage,
  sendMessage,
  getAllUsers,
  sendPost,
  sendPhoto,
  loginUser,
  registration,
};
