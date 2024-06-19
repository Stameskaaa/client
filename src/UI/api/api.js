import axios from 'axios';

const getUser = async (name) => {
  try {
    const response = await axios.get(`http://localhost:5000/getuser?name=${name}`, {
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
  const response = await axios.get(
    `http://localhost:5000/getuserlist?name=${name}&type=${type.toLowerCase()}`,
  );
  if (Array.isArray(response.data)) {
    return response.data.filter((v) => v);
  } else {
    return [];
  }
};

const addFriend = async (log, log2) => {
  try {
    const response = await axios.patch(`http://localhost:5000/addfriend?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const cancelSub = async (log, log2) => {
  try {
    const response = await axios.patch(`http://localhost:5000/cancelsub?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deletefriend = async (log, log2) => {
  try {
    const response = await axios.patch(`http://localhost:5000/deletefriend?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const subscribe = async (log, log2) => {
  try {
    const response = await axios.patch(`http://localhost:5000/subscribe?name=${log}`, {
      user: log2,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkdependence = async (log, log2) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/checkdependence?log=${log}&log2=${log2}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const uploadMessage = async (name) =>
  axios.post(
    'http://localhost:5000/uploadmessage',
    { user: name },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

const getUserChats = async (name) => {
  const response = await axios.get(`http://localhost:5000/getuserchats?name=${name}`);
  return response;
};

const getPhotos = async (name) => {
  const response = await axios.get(`http://localhost:5000/getphotos?name=${name}`);
  return response;
};

const uploadChat = async (log, log2) => {
  const response = await axios.get(`uploadchat?log1=${log}&log2=${log2}`);
  return response;
};

const getPersonalMessage = async (firstUser, secondUser) => {
  const response = await axios.post(
    'http://localhost:5000/personalMessage',
    { firstUserData: firstUser, secondUserData: secondUser },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response;
};

const sendMessage = async (firstUser, secondUser, value, currentTime) => {
  const data = await axios.post(
    'http://localhost:5000/sendMessage',
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
  const request = await axios.get(`http://localhost:5000/getallusers?first=${name}`);
  return request;
};

const sendPost = async (formData) => {
  const request = await axios.post(
    'http://localhost:5000/sendPost',

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
  axios.post('http://localhost:5000/sendPhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const loginUser = async (log, pass) => {
  const request = await axios.post(
    'http://localhost:5000/loginUser',
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
    'http://localhost:5000/registrationUser',
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
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return request;
};

export {
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
