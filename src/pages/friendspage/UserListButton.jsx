import { CircularProgress } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';

export const UserListButton = ({
  selectedCategory,
  buttonLoading,
  name,
  subscribe,
  addFriend,
  cancelSub,
  deleteFriend,
}) => {
  function checkCategory(name) {
    if (selectedCategory === 0) {
      deleteFriend(name);
    }
    if (selectedCategory === 1 || selectedCategory === 2) {
      cancelSub(name);
    }
  }
  let componentArray = [
    [<FaTrash />, checkCategory],
    [<FaTrash />, checkCategory],
    [<IoMdCheckmark />, addFriend, <FaTrash />, checkCategory],
    [<IoMdCheckmark />, subscribe],
  ];

  return (
    <>
      <button onClick={() => componentArray[selectedCategory][1](name)}>
        {buttonLoading ? <CircularProgress size={14.5} /> : componentArray[selectedCategory][0]}
      </button>
      {componentArray[selectedCategory].length > 2 ? (
        <button onClick={() => componentArray[selectedCategory][3](name)}>
          {buttonLoading ? <CircularProgress size={14.5} /> : componentArray[selectedCategory][2]}
        </button>
      ) : null}
    </>
  );
};
