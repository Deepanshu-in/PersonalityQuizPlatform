import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import dropdown from "../Assets/dropdown.svg";
import programsList from "../Assets/data";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../../features/authSlice";
import userAccPhoto from "../Assets/icons8-user-96.png";
import { updateStudentInfo } from "../../features/studentInfoSlice";
import logo from "./../Assets/logoQuiz.svg";
import { BiMenu } from "react-icons/bi";

//for login and signup
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { app } from "/src/firebase/firebase.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [active, setActive] = useState(null);
  const [userPhoto, setUserPhoto] = useState(userAccPhoto);

  const signUpUser = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
          setUserPhoto(userAccPhoto);
        })
        .catch((error) => {
          console.log("An error occured during signOut : ", error);
        });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Signed in");
          const details = getAdditionalUserInfo(result);
          //checking if the user signed in is new or old
          if (details.isNewUser) {
            dispatch(newUser());
          }
          const displayName = result.user.displayName;
          const email = result.user.email;
          const photoURL = result.user.photoURL;
          setUserPhoto(photoURL);
          dispatch(updateStudentInfo({ field: "name", value: displayName }));
          dispatch(updateStudentInfo({ field: "email", value: email }));
        })
        .catch((error) => {
          console.log("An error occurred during signIn: ", error);
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        dispatch(isUser(data.uid));
        setUserPhoto(data.photoURL);
        dispatch(updateStudentInfo({ field: "name", value: data.displayName }));
        dispatch(updateStudentInfo({ field: "email", value: data.email }));
      } else dispatch(isUser(null));
    });
  }, []);

  const user = useSelector((state) => state.auth);
  const clickHandler = (type) => {
    setActive(type);
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="h-32 mb-[10px]">
      <div className="flex flex-row justify-between py-4 px-20">
        <div className=" flex flex-row  gap-4 items-center">
          <Link to="/">
            <img src={logo}></img>
          </Link>
          <div className="flex flex-row gap-8 items-center ml-4">
            <button
              onClick={() => clickHandler("About")}
              className={
                active === "About"
                  ? "underline decoration-[#6a3da5] decoration-4 underline-offset-8"
                  : "hover:underline hover:decoration-[#6a3da5] hover:decoration-4 hover:underline-offset-[6px] hover:transform hover:duration-500"
              }
            >
              <Link to="/about-us">About</Link>
            </button>

            <div className="dropdown dropdown-hover f">
              <div tabIndex={0} role="button">
                <div className="flex flex-row gap-1 items-center">
                  <button>Take Your Test</button>
                  <img
                    className="h-4 w-3 mt-1 disabled:pointer-events-none"
                    src={dropdown}
                  ></img>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[250px] mt-2"
              >
                {programsList.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.link}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => clickHandler("Blog")}
              className={
                active === "Blog"
                  ? "underline decoration-[#6a3da5] decoration-4 underline-offset-8 "
                  : "hover:underline hover:decoration-[#6a3da5] hover:decoration-4 hover:underline-offset-[6px] hover:transform hover:duration-500"
              }
            >
              <Link to="/blog">FAQs</Link>
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <button
            className="border rounded-xl w-28 h-[40px] hover:bg-[#e8dbfc] border-[#6a3da5] text-[#5d2057] bg-[#EFE4FF]"
            onClick={signUpUser}
          >
            {user ? <h1>Logout</h1> : <h1>Login</h1>}
          </button>

          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          <img src={userPhoto} className="rounded-full w-12 h-12"></img>
        </div>
      </div>
      <div className="border border-[#AE7DD8]"></div>
    </div>
  );
};

export default Navbar;
