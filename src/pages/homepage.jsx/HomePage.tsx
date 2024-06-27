import syles from './homepage.module.scss';
import { MyProfile } from './myprofile/MyProfile';
import { BlogPost } from './blogpost/BlogPost';
import { ProfileNavigation } from './profilenavigation/ProfileNavigation';
import { FriendRequest } from './friendrequest/FriendRequest';
import { useAppSelector } from '../../UI/hooks/hook';

export const HomePage: React.FC = () => {
  const profileObj = useAppSelector((state) => state.auth.profileData);
  return (
    <div className={syles.main_container}>
      <div className={syles.main_leftWrapper}>
        <MyProfile profileObj={profileObj}></MyProfile>

        <ProfileNavigation></ProfileNavigation>
      </div>
      <div className={syles.main_middleWrapper}>
        <BlogPost></BlogPost>
        <BlogPost></BlogPost>
        <BlogPost></BlogPost>
        <BlogPost></BlogPost>
      </div>
      <div className={syles.main_rightWrapper}>
        {/* {profileObj.subscriber.length > 0 ? (
          <FriendRequest profileObj={profileObj}></FriendRequest>
        ) : null} */}
      </div>
    </div>
  );
};
