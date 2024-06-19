import { useEffect, useState } from 'react';
import styles from './profileblock.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../UI/api/api';

const catImg =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRYWFhUYGRgaGRoYFRocGhgYGBgaGBoZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGBIRGDEdGB0xMTExMTExMTE0MTE/MTExNDQ0NDExPzQxMTExPzQxMTQxMTExMTExMTExMTExMTExMf/AABEIAOYA2wMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwEEAAUGBwj/xAA2EAACAQMDAgQFAwQBBAMAAAABAgADESEEEjFBUQUGImETMnGBoRRCkQdSscHwI4LR4RVicv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAQEAAwEBAAAAAAAAAAAAARESAjFBIVH/2gAMAwEAAhEDEQA/ANzcE2Maqe+BJ/8AjGPeXaHhnWR3VDTvwZbWg3Qx36aWdLQMBNCkQbdY1iQbW+sa5AH/ANoKMxFzAFbk2kZUSKjfzBRgeYDEIOYbOPrBFMWvBBHMmgkJJ9pmpcDErCuxJAjM/uEswR97wmBhUyBwJD85koxPrMrVioxAD7RxFmoX4kC9S7EYmU3awvzJYHrFM5HE0Jeu6nEq1XdiBewj/iXbmCUzBYSxqDrFNVqXteXmzgcyvUQ3mUxXZ37ybnqcx/xAcWkOnW00YUoY8TDSPBOZCs4yBaSajHPWDANpSesRtbtH0i5PEL1RqY6AObWAk79nMJKZAvIRsi8NJpkNC3WwDIVxc9JibQcwMVcX6wlc4FsTDa4kNYG14AOoHPWJIVSLdY11He8xGS+RAwm1hGhLCKZiDe2Jh1NzaAwLi4EAoTzISraEa4gAi2MDUHPMazA5ildRzMiHAAz1goADDd1t7wPjC4mhlRSTgYiqtM2ltH69IGo1Kk2hdirUQEcfxF06D2lk6pQCBCXUIRmDVShTZTc9ZYIHaDV1i2sIFHUkjMkNOSmgyeYusLnAxMVrnMb8QASmiWipH0gU9KMfWMLYx1lujTFrk27yYlqqKVrgCM/Re0t03RTe49of6pe4jE6Ud+LTEcMYxtl4sotjaTVSUS+TMqHi1orTJfJBgMG3W4Eui4WuJWdgB7ya25QD34kUVJsSJNGb9oHF4AB5MZqdNc7r2EGm9yRyBLKI+KWWYlM3uMzAo/bxG0qm0ygdhPOBEtg25jmO4nPWIZzcgCAJS4OYhFNpbo0Df1QzT7cQKlBI9qe0YyTMWhkiElIkwF0qZ6n7RNXTG95fanbIN+8N6WBc2k1capNORc9IfwbrgS6rrlZaVF245lTGkfSsLYkrpmPsJuUpkkXjaiJjMzpjUtpT3tITSnvLWpNvlzEIzXmlwtqjWsJqauoqE2uZuqi2yIKolju5hGiqVHXG68X+rfuZdIW5sLxn6Re8ms2N382byVtcZg1V2w0QAXt95nHQx3C27yo2o9VrRrjdzeC2mNgRKCouSbSatTbk9OYmiHU+81PnPXChQZr2JGM9TLkTWo8z+fUo+hRvb/nM53Tf1LqqcUUIPe889q1GdixJJJvO58t+Q2rIXqOUvYqB/uWY5667wz+oOmqBQ96bnBx6f5nYBgyq6kMCLqRwRPNk/pfVPzahNvXGbTu/CvDl09JKKOWVBa5OYai3/uQzgY7wyYDgYhVR3csc4Eynuz9cS2EAvbEgU7ZgFSXqeesYaluftEpa0eLDpeZPoBzk+mQzknjAwJjEDpeGzBQL89JFpRo8mWf1AQQKbrzeMfSqRcmaiqVTV3JtAWttyc3iqz00J9YmvfxJG4Il5TV9tQSbwH1X8zWtqQ37rQPjWU2NzGJ0e9ctf1H2lYbyct/MVUcgAlusZ8QP1tNYzpi1No+bMV8Ru8RVZVxz7yt+tEYmu7pVObiGr3OBFJTaFYjpOTqNh0g1Da1jmA6EmHTW0MiNhycmeWf1c1J3U0Bxa/5nqDMOv2nlH9VkIekelj/maieTifBae+vSXu4E+htIu1FsOLAzwLyswGq05P8Af/5nvlJuR0lZhz12YWAmU8+3f3k01B4MmrbAAkdMA/QCSQSbfzJU5t/Mo+M+MJpkubXscfSUqzqKyopY4UckzhvGvPqIStM3nJ+YvN1XUsUU7Vvn3nJO1yYYvk7Sv561BNxYCCPP2pBGRacejHMG0Mzyr07w7+ovSpb+DOy8H8x0K49LC/vPn4y1oNa9Jwykjj8QvT6F1NZeQZznivjzgkBvTNNofFDWTcp6Z+s53zHqnVbqDa81Il8m/wD1Yc3JN/rGU7Dm883p+J1FN91/8TpfC/MStYNzLqa6Nn7cQRqSnN/eNTbYMOvMGvTuCSRaVcGmr3DPENWBGLyrprG4j94GDm8Ag69czN9P+2Bsh7faE16IrYiw5vmFuaLtcm84Y7nVqo5H0iymCfxApIEv1jPiCWRkmmjNki04/wDqf4Q1TTB1yUNz9LztHqdonWgVEemwwwIj6Wa+baFQqwYcggj7T3ryb40mp06n9wAV/raeKeO+GNp670z0J2+4m18kePHTVwGPoc2b2PQzTn6e6VXCLYD6xSVu2TApOHUEZuL/AGM0fmXxpdKhONx4EN9Nh474+mnQk/OZ5B4l449d3LnGbfSa/wAY8Zeu5Zmx2lPT1MHiakZtVi9mJHebfyz4emorinUbbcEjIFyOBNO/Mmm5BBBsRnGD/MVG98y+Xm0uxifS17C4JFjNDeOr6t3+Z2boLkmwiJkb3y55ffV7yD6aa7mI+b2AHWZ5m8B/Ssi79xdA5HVb9DNbofEKlEk03ZL82NrxWp1LuxZ2LMeSTcmEx1Pkqow3gcCdFqdGlRCrfaafyVR2ozf3GxnSNp17zWaY4TW+WWW5U+4nP7SpI6gz0vxLVbUbOB1nm+pfc7EdTLiu+8GrmrQS49v4m2ROO3Wabykq/AXNzc/abxqZ6ShdQBciH8RRYgervLCsFFrA37yvUuP24gC1W3PMj4x7SwunV8394o6cwZHefEJNr4mN7CSlFUBzcwgAQL4nKenYveeDC+Bfi/vIZAOI5dQbSMkM9sdYxQOvMr6llvckCa/UeJIuBk9TLhrSf1D8tJVomqp/6i5+o7TxlsGe26zxBqgI6f6nk/mPR/DqttGGJIlYroPLXnV6NMo5vtHoJz0nPeMeOVNS5dzftNVeDLIg2MlGsPrFQr4mkSZkCSslEzJkkTKsmz8H8Lasw5C9f5j/AC/4P+obJAA5nZGnT06WDC3XvBVnRIlJdg4I/MLU1FVbs4AnOazzGi/KLzQeI+NPVFrWE2mmeN+KF2KofTNMMyNp5nUeVfAfiH4lTCL8o/uMkquh8u6UpSQWzyfvNu1MoQSeekCiqhuSB2mKm4khyfaUNNiLwqhsLcxS3Y2IsOkaulRRcsTAW17XEj4x7RrMCLC8H4YgdsKtukJkJtnmVNQ6IfUwM1ep8x/tUfTE5ZXXW8qVEQXdrTTa7zAgwnPQzS6rXO/zC/btNaAd2QLy+Pj/AFm1eq1HqG+8/SCqi1mJ+0TUqFRcH1QEc2Fz6j0E3yxp1RHawQHPvOS870GT4e7sZ06atw1rE9pxXm7Vl6oF72GR94w1zsmRCBlREiTIgZMmTJMGSVkQlElIv+HeJvRDbOTiJ1OsdzdiZXmBDIVlo3TUGdgqi5M3Hg3l96o3N6V/zOy0HhlOggKKC3Um1xL7WNN4T5T2gPX+yDk/WdPpq4XBS3QAC0taZwcsL3gVgL3/ABNelwmrUF+LRyUkAuPtaJqAN9ZboqqjJtCfpNNTkMMdJO8W28xztuNgZDUmA9XTrBhbUy2OIWwjrCXUsP247yPjntAp1dWHG4hjcxtLUBht2mKeqDkJ+JK3sWwPaDS7Anm1uhiQu43HSPRha9rk83gPTCi9+ekoAC564kL3K+whbxbBsf8AMB3uec/iQNq19qMx5APT+J5brqu52buTO88fqslD/wDU89YydJgZklZJEdGBmWh29o6npXbhTHRitaTNkng1ZshDKmp0zIbMLRphImCZMMyqZ13lzwY2Dst75F+00nl/TCrWVW45P2no7KVwp9Nv+CVYNqwUBVWw6zHAyci8KlpQQCxP2kuNrDrLq4tin/078e8rfpUIX1m/OY1Hax7HpD+FgYjQsUlX1bvtAdmJuBeY6E4VcSQ7KcsL8CKqaTm9wLd5FZntc5H5hbG2+kXJkWYGx+8iJVgFvYiL+J7R1eriwF8dZX+B9ZAL1Ba7f+5Uat2/MshEfDMb/wAQNayJ8iE95tkhWP8AbfvbiWSpAvYW/MjR6zoEIBhakZscA5vAVfIZrWjNVqLgbAuMSGpBjtAOOTDO0EBD0zA5PzjqWKIpsCM2E46brzTqS9Yg/txNKRMA6FEuQo5Jnb+FeWUC7mF5qfJ+hLuXIuF6Tu1AeyncnWFxoU8uJfdbAOe02y6VEUIEGRgxv6hhdAfTfNxzHUHBB9NoVGi07qLPtHUfSct550SlVdfvOpLHg8fma3x3ShtK5PS8JXlxkAQisgCEdp5I0Iy55vadkiesYx26TlPIBuGBPXidpVupsAIa+ISgrMS3pUcWg7RyMjvBVyb+niA9YmwXAvkQLPOLXMVURhyYxxtGTnpFadwTmBLpS2ctftJ01NSO/a8itRtcqpMinX2j5fv2gNoU23XhmscjFu/WVjW3cE3kop6wGrTXZjv1mbU7yEqWwReU35ODAqNpQ5w4h10Cenk25gVtKUA2m5JgOG7Z63m2U0mZcm59pYrMrLuJ+g6yo6MLYJ9+0mrRtYsSb/aAVHUKbfMOhjKNNyxsuDwYpaqgWA+ssV9UVpM4sNoJEDzXx0AV3zfP5mvtD1NYu7OeSbzNNRLuq9SZgd/5R022mCBnk9pvtSrfOVsOkRoaa06KowO6wyI4I5HzXQdDzCyhF7XtzxLFGkXFxc2+wEVtapgGwHQR9HVlRs2+1x/uECHUE3+g7yn4nTLo6Z4MsNQS9xlr/wASytdVHq6wPGNXSKOVPQxSmdD5u0RSqWt6W4nPrzA7byClyxPSdfqGYG6m85TyDTB3KcA8mdW9IK9ubce8LGUKpF96m/eYmnYklWBvx7R+8sfUBjp7RFbU3O1F2/SFGh/uNyP4gJWCtZsn24k0tKzHmExUGxzAa6O3qB9Mq1aTki2V6y3QrdD8vaS1emvIa98QIpvt+VIvdc3YH/UdUYk7VGD3iHp7fU7/APbAPTsDu3EAdIv9OejY6TPjryEt/iM+GxziBWpJdgCfoZGotwbG3XvIfcW2ru9u0QEsdrYPW/Sa1kVV2xYcciTqBvHBuAPpLVNVPDY6n/UjTVD6iRi+DJorJp9iG4vftzOf80vsoWF7Mes6YIAdy+q/IPE53zppGZBYcZPtGrjz+06PyboFqVSzcKPzac4ROv8AIyH1C9rkQjrkQNgm3eWNrKLAXv1i69FE4YkkfmDpNVa4YgnoOsNLT02W1jY2lY6Vrk7uYQO8ks9iIFAm5sxOZCnUKBB5sT3jNioy3G4nqYDrbDNn/EXRAudxPtCRo/O+kZ0LCxC9uk85Anr2s0u5HXuL/WeU66iUd1t1grrfIyg77/adelZT+03H8zhvJmsRGO82PSdtp66X3KQxPAEEOeutyL3v9jCpgXGznreAlK7EuoufxGEbfSMk8QphqeqxPsbRWpVb+lcd4t3XGLG+frMrsAAtzntAiqU23Fy0fS3KAzD7RYUKLKM+8PeR6Sck/aAK647vl4hNUVmu4yeAYyrT2H1EX6ARJrXIBBPvaA3VoE5Hq6CLGqb2mVDzbnuZV+B7mA+mpzfgcEcxdWqew+/Jhni3HUGZU0/BZwf+doUnU6bcPRgn5h0lvTaUqgUfmVUUAFtxJHAEx9SWAuxGcd4RaTTFbk29szUeM0HZMcHkTcsqhRe56xGpG5SzOLWwBLC+nn7+GDqJsdANgsDabCvQvYrciIqaY9AcczbH6sp4icg/zHKyKcC7HJbpNalM5sDftDp3PP0MmG1t6Wozi3uYxtWqenGTfiaTaFvzmS78W/PSTk6bw1A2cTC55BBE0jXF/eMp1dosOsck8m6psz4uL/4E4HzfoSlUtzftOgRx6iGMRW0e8AkbvqcxzV6jh724NptvAPEXSooDGxPE3K+EUrm6Zmz0fhFGmyvsuRkdpOamt8jllFwdx6yyqAKCTcg46W9pRfU1LgkqBwAI+q9kDcky43BDYXyQDJoMbksRb9uJrkNzuuY5dcUcLa8mC1VrlGsSqnpfN4FVycKB7nj+JCsu/fUXd2PaMFJG9d7not4wLQkHncT15EttRdF3lhfrYQGJVQRYA/S4i2qhlPqzIID7hcHBhhYt67WCAD7RDI0CyjleVv2k1qiXUWuZlegyqCBuPa/EimVPQbutukBdPTncbg27Rvw9pyLdusMuFHz9euYmvqWQ7jY/2nkQGtWQDb16yk6oOSc/L1z2MbpU3AsVsxvmFpaS7rhQSO8FIp0iBdl2/fFoRpIASH5HEZXctc7Sc8RToTb0malTFFA7MQq472h09Fe+QB1+vWbPeVIKi3QwammVipN+/wBY6SxqmpAYWxMY+nVQLjJlj9KCxIFiOPeWaFQBfWlz0jpOWtNGw3EQWoFhcW2zYPUTcLnHaJrVAMcA8CWVcinR0ytgYzmC2nVX2Bj/AKmy0ul5JtjgDMcaCk7hg9jGpjW1dIRawv3g1KZDAHE2aadw248doAqlmsUuBxGmE6fSh+DYDmLrj1YPoHIl/U1EpmwU7+va0rtU3/sKr3laJpluVFk/MLU9LA2tzDbTW4NweOloKUHsRzbiQWtJWAUra5PeQKQGQR7jtEJTcj5bEGAxYk78Z6RWl2o5YWxaK9CZtf2kISENgbd+8jT1Ab7kx9ZlD0ZWsSdkqOy3OTHsyDpe/HsPeYlRLD0fiQM1WqZdlrXPMlDZS1heZMgK1FrYHMBK4JAIvMmQLtbUBFB23mJqNy3CgTJkDHrbCEA5yTFvVO63aZMgHVwLc3MGvVKALg36zJkA2sKatbJMwoGGfrMmQK1c52gC/cwatIso3WNuJkyBXoqyvfdjiw4jqZJc54OJkyWJVs7gpO6/1lSgXc5Yf7mTIRNdhuANyTi5zLFenZQtzn+JkyGoIaYJYt6rxOr1nw1wokTJYqdNrW23NjeYaBJJvg5I/wDEyZLUCzEcHA6HrMXV/E9IUKPzMmSRaJdRtXKgnpJCBs25kTIR/9k=';
export const ProfileBlock = () => {
  const [loading, setLoading] = useState(true);
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const [currentProfile, setCurrentProfile] = useState(profileObj);
  const navigate = useNavigate();
  let { name } = useParams();
  const [privateProfile, setPrivateProfile] = useState(() =>
    name == profileObj.name ? true : false,
  );

  useEffect(() => {
    if (profileObj.name === name) {
      setCurrentProfile(profileObj);
      setPrivateProfile(true);
      setLoading(false);
    } else {
      getUser(name)
        .then((res) => {
          setCurrentProfile(res.data[0]);
          setPrivateProfile(false);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          navigate('/');
        });
    }
  }, [name]);

  return (
    <>
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <div className={styles.container}>
          <img className={styles.image} src={currentProfile.img} />
          <div className={styles.description}>
            {currentProfile.name}
            {` `}
            {currentProfile.lastName}
            <hr className={styles.coloredHr} />
            <ul className={styles.ul}>
              <li>Age: {currentProfile.age}</li>
              <li>Work: {currentProfile.work}</li>
            </ul>
          </div>
          {privateProfile && <button className={styles.button}>Редактировать</button>}
        </div>
      )}
    </>
  );
};
