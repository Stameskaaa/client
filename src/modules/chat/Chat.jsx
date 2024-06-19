import styles from './chat.module.scss';

import { LeftSideChat } from './leftsidechat/LeftSideChat';
import { RightSideChat } from './rightsidechat/RightSideChat';

export const ChatRoom = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_leftside}>
          <LeftSideChat />
        </div>
        <div className={styles.container_rightside}>
          <RightSideChat />
        </div>
      </div>
    </>
  );
};
