import { Layout } from './pages/layout/Layout';
import './index.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/mainpage/MainPage';
import { NewsPage } from './pages/newspage/NewsPage';
import { MessagePage } from './pages/messagepage/MessagePage';
import { FriendsPage } from './pages/friendspage/FriendsPage';
import { GroupsPage } from './pages/groupspage/GroupsPage';
import { LoginPage } from './UI/HOC/HocAuth';
import { RegistrationForm } from './modules/registrationform/RegistrationForm';
import { CustomRedirect } from './modules/redirect/Redirect';
import { ChatRoom } from './modules/chat/Chat';
import { CheckChat } from './UI/HOC/HocCheckChat';
import { HomePage } from './pages/homepage.jsx/HomePage';
import { RightSideMain } from './pages/mainpage/RightSideMain';
import { AboutMain } from './pages/mainpage/about/AboutMain';
import { PhotosMain } from './pages/mainpage/photos/PhotosMain';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { FriendsMain } from './pages/mainpage/friends/FriendsMain';
import { PageTracker } from './components/pagetrack/PageTracker';
import { Profile } from './pages/EditProfile/Profile';
import { Security } from './pages/EditProfile/Security';
import { Notifications } from './pages/EditProfile/Notifications';
function App() {
  return (
    <div>
      <PageTracker />

      <Routes>
        <Route />
        <Route
          path="/*"
          element={
            <LoginPage>
              <CustomRedirect />
            </LoginPage>
          }
        />

        {/* <Route path="/rooms" element={<JoinRooms />} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="registration" element={<RegistrationForm />} />
          <Route
            path="/"
            element={
              <LoginPage>
                <HomePage />
              </LoginPage>
            }
          />
          <Route
            path="home"
            element={
              <LoginPage>
                <HomePage />
              </LoginPage>
            }
          />
          <Route
            path="mainpage/:name"
            element={
              <LoginPage>
                <MainPage />
              </LoginPage>
            }>
            <Route path="*" element={<RightSideMain />} />
            <Route path="posts" element={<RightSideMain />} />
            <Route path="photos" element={<PhotosMain />} />
            <Route path="about" element={<AboutMain />} />
            <Route path="friendlist" element={<FriendsMain />} />
            <Route index element={<Navigate to="posts" replace />} />
          </Route>
          <Route
            path="editprofile/:name"
            element={
              <LoginPage>
                <EditProfile />
              </LoginPage>
            }>
            <Route path="*" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="security" element={<Security />} />
            <Route path="notifications" element={<Notifications />} />

            <Route index element={<Navigate to="profile" replace />} />
          </Route>
          <Route path="news" element={<NewsPage />} />{' '}
          <Route
            path="message"
            element={
              <LoginPage>
                <MessagePage />
              </LoginPage>
            }></Route>
          <Route
            path="chat/:name"
            element={
              <LoginPage>
                <CheckChat>
                  {' '}
                  <ChatRoom />
                </CheckChat>
              </LoginPage>
            }
          />
          <Route
            path="friends"
            element={
              <LoginPage>
                <FriendsPage />
              </LoginPage>
            }
          />
          <Route
            path="groups"
            element={
              <LoginPage>
                <GroupsPage />
              </LoginPage>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
