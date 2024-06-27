import { CircularProgress } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { ReactElement } from 'react';

interface Props {
  selectedCategory: number;
  name: string;
  buttonLoading: boolean;
  subscribe: (name: string) => void;
  addFriend: (name: string) => void;
  cancelSub: (name: string) => void;
  deleteFriend: (name: string) => void;
}

export const UserListButton: React.FC<Props> = ({
  selectedCategory,
  buttonLoading,
  name,
  subscribe,
  addFriend,
  cancelSub,
  deleteFriend,
}) => {
  const iconArray: ReactElement[][] = [
    [<FaTrash />],
    [<FaTrash />],
    [<IoMdCheckmark />, <FaTrash />],
    [<IoMdCheckmark />],
  ];

  const actionArray: ((name: string) => void)[][] = [
    [deleteFriend],
    [cancelSub],
    [addFriend, deleteFriend],
    [subscribe],
  ];

  return (
    <>
      <button onClick={() => actionArray[selectedCategory][0](name)}>
        {buttonLoading ? <CircularProgress size={14.5} /> : iconArray[selectedCategory][0]}
      </button>

      {iconArray[selectedCategory].length > 1 && actionArray[selectedCategory].length > 1 ? (
        <button onClick={() => actionArray[selectedCategory][1](name)}>
          {buttonLoading ? <CircularProgress size={14.5} /> : iconArray[selectedCategory][1]}
        </button>
      ) : null}
    </>
  );
};
