export interface UserData {
  img: string;
  name: string;
  lastName?: string;
  subscribed?: EmptyStringUserData[];
  subscriber?: EmptyStringUserData[];
  friends?: EmptyStringUserData[];
  age: string;
  gender: string;
  _id: string;
  posts?: Posts[];
  work: string;
  photos: UnionOfPhoto[];
  martialStatus: string;
  birthDate: string;
  location: string;
}

type UnionOfPhoto = Photo | '';

type UserDataType = null | UserDataInnerList;

export interface ResponseFromChangeFriends {
  text: string;
  data: UpdatedArrays;
}

export interface UpdatedArrays {
  [key: string]: UserDataType[];
}

type EmptyStringUserData = UserDataInnerList | string;

export interface Photo {
  time: string;
  likes: string;
  comments: string;
  reposts: string;
  files?: File;
}
export interface UnionFileBuffer extends File {
  buffer: string;
}

export interface Posts {
  value: string;
  time: string;
  likes: string;
  comments: string;
  reposts: string;
  files?: UnionFileBuffer[];
}

export interface UserDataInnerList {
  img: string;
  name: string;
  lastName?: string;
}

export interface Messages {
  chat: Message[];
  firstUser: string;
  secondUser: string;
  _id: string;
}

export interface Message {
  message: string;
  status: string;
  time: string;
  user: string;
}
