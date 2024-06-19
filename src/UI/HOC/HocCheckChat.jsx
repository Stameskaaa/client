import { useParams } from 'react-router-dom';
import { CustomRedirect } from '../../modules/redirect/Redirect';
import { useAppSelector } from '../hooks/hook';

export const CheckChat = ({ children }) => {
  const name2 = useAppSelector((state) => state.auth.profileData.name);
  const { name } = useParams();

  if (name === name2) {
    return <CustomRedirect path={'/messages'} />;
  }

  return children;
};
