import axios from 'axios';

const src = process.env.REACT_APP_SRC;

const getUser = async (name) => {
  try {
    const response = await axios.get(`${src}/getuser?name=${name}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUserList = async (name, type) => {
  const response = await axios.get(`${src}/getuserlist?name=${name}&type=${type.toLowerCase()}`);
  if (Array.isArray(response.data)) {
    return response.data.filter((v) => v);
  } else {
    return [];
  }
};

const addFriend = async (log, log2) => {
  try {
    const response = await axios.patch(`${src}/addfriend?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const cancelSub = async (log, log2) => {
  try {
    const response = await axios.patch(`${src}/cancelsub?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deletefriend = async (log, log2) => {
  try {
    const response = await axios.patch(`${src}/deletefriend?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const subscribe = async (log, log2) => {
  try {
    const response = await axios.patch(`${src}/subscribe?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkdependence = async (log, log2) => {
  try {
    const response = await axios.get(`${src}/checkdependence?log=${log}&log2=${log2}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const uploadMessage = async (name) =>
  axios.post(
    `${src}/uploadmessage`,
    { user: name },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

const getUserChats = async (name) => {
  const response = await axios.get(`${src}/getuserchats?name=${name}`);
  return response;
};

const getPhotos = async (name) => {
  const response = await axios.get(`${src}/getphotos?name=${name}`);
  return response;
};

const uploadChat = async (log, log2) => {
  const response = await axios.get(`${src}/uploadchat?log1=${log}&log2=${log2}`);
  return response;
};

const getPersonalMessage = async (firstUser, secondUser) => {
  const response = await axios.post(
    `${src}/personalMessage`,
    { firstUserData: firstUser, secondUserData: secondUser },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response;
};

const sendMessage = async (firstUser, secondUser, value, currentTime) => {
  const data = await axios.post(
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

const getAllUsers = async (name) => {
  const request = await axios.get(`${src}/getallusers?first=${name}`);
  return request;
};

const sendPost = async (formData) => {
  const request = await axios.post(
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

const sendPhoto = async (formData) => {
  const request = await axios.post(`${src}/sendPhoto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return request;
};

const loginUser = async (log, pass) => {
  const request = await axios.post(
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
  return request;
};

const registration = async (regAcc) => {
  const request = await axios.post(
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
  return request;
};

const changeProfileData = async (profileDataObj, name) => {
  const request = await axios.post(
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

const deleteMessages = async (log, log2, arrayIndexes) => {
  const response = await axios.post(
    `${src}/deleteMessages?log1=${log}&log2=${log2}`,
    { arrayIndexes },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response;
};

const editMessage = async (log, log2, objectInfo) => {
  const response = await axios.post(
    `${src}/editMessage?log1=${log}&log2=${log2}`,
    { objectInfo },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response;
};

const sendStatus = async (status, name) => {
  const request = await axios.get(`${src}/sendstatus?status=${status}&name=${name}`);
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
