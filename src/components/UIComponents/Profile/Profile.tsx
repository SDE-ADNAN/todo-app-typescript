import { useSelector } from "react-redux";
import "./Profile.scss";
import { RootState } from "../../../ReduxStore/store";
import { includeDarkClass } from "../../../CONFIG";

const Profile: React.FC = () => {
    const userProfile = useSelector((state: RootState) => state.User.allUserData);
    const darkMode = useSelector((state: RootState) => state.UI.theme.dark);

    return (
        <div className={includeDarkClass("profile_main_container", darkMode)}>
            <div className={includeDarkClass("profile_main_card", darkMode)}>
                <div className={includeDarkClass("profile_pic_con", darkMode)}>
                    {/* <div> */}
                    <img src={userProfile.picUrl} alt="profile pic"></img>
                    {/* </div> */}
                    <div className={includeDarkClass("header", darkMode)}>Profile Picture</div>
                </div>
                <div className={includeDarkClass("horizontal_divider", darkMode)}></div>
                <div className={includeDarkClass("profile_userName_con", darkMode)}>
                    <div className={includeDarkClass("header", darkMode)}>UserName :&nbsp;</div>
                    <div className={includeDarkClass("content", darkMode)}>{userProfile.userName}</div>
                </div>
                <div className={includeDarkClass("horizontal_divider", darkMode)}></div>
                <div className={includeDarkClass("profile_email", darkMode)}>
                    <div className={includeDarkClass("header", darkMode)}>Email :&nbsp;</div>
                    <div className={includeDarkClass("content", darkMode)}>{userProfile.email}</div>
                </div>
                <div className={includeDarkClass("horizontal_divider", darkMode)}></div>
                <div className={includeDarkClass("profile_picUrl", darkMode)}>
                    <div className={includeDarkClass("header", darkMode)}>Profile Pic Url&nbsp;</div>
                    <div className={includeDarkClass("content", darkMode)}>{userProfile.picUrl}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
