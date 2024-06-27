import { Button } from '@mui/material';
import { useState } from 'react';
import styles from './registrationform.module.scss';
import { InputForm } from './inputform/InputForm';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { authStateCheck } from '../../UI/slices/authSlice';
import { SuccessRegistration } from './succesregistration/SuccessRegistration';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../api/api';

const inputArr = [
  { type: 'text', placeholder: 'name', important: true },
  { type: 'text', placeholder: 'lastName', important: false },
  { type: 'password', placeholder: 'password', important: true },
  { type: 'text', placeholder: 'age', important: false },
  { type: 'text', placeholder: 'work', important: false },
];

interface RegistrationData {
  [key: string]: string;
}

export const RegistrationForm: React.FC = () => {
  const [regAcc, setRegAcc] = useState<RegistrationData>({
    lastName: 'unknown',
    age: 'unknown',
    work: 'unknown',
  });

  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.authState);
  const navigate = useNavigate();
  const registrateAcc = async () => {
    if (regAcc.name && regAcc.password) {
      try {
        await registration(regAcc).then(() => {
          setFlag(true);

          dispatch(
            authStateCheck({
              flag: true,
              infoPerson: {
                ...regAcc,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s',
                friends: [''],
                subscriber: [''],
                subscribed: [''],
                status: 'offline',
              },
            }),
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!authState) {
    return (
      <div className={styles.container}>
        Registration
        <form className={styles.form}>
          {inputArr.map((v, i) => {
            return (
              <InputForm
                flag={flag}
                setFlag={setFlag}
                setRegAcc={setRegAcc}
                key={i}
                type={v.type}
                placeholder={v.placeholder}
              />
            );
          })}{' '}
          <Button style={{ width: '200px', border: '1px #45a29e solid' }} onClick={registrateAcc}>
            SEND
          </Button>
          <Button
            onClick={() => navigate('/')}
            style={{ width: '200px', border: '1px #45a29e solid' }}>
            Уже есть аккаунт?
          </Button>
        </form>
      </div>
    );
  } else return <SuccessRegistration />;
};
