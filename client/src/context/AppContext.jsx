// import React, { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [user, setUser] = useState(null);
//   const [showLogin,setShowLogin]=useState(false)
//   const[token,setToken]= useState(localStorage.getItem('token'))
//   const [credit,setCredit]= useState(null)
//   const backendUrl= import.meta.env.VITE_BACKEND_URL

//   const navigate=useNavigate()
//   const loadCreditData= async()=>{
//     try {
//       const { data } = await axios.get(backendUrl + '/api/user/credits', {
//   headers: {
//     token: token 
//   }
// });
//       if(data.success){
//         setCredit(data.credits)
//         setUser(data.user)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
// const fetchUser = async () => {
//   const localToken = localStorage.getItem('token');
//   if (localToken) {
//     try {
//       setToken(localToken);

//       const { data } = await axios.post(backendUrl + '/api/user/profile', {}, {
//         headers: {
//           token: localToken,
//         },
//       });

//       if (data.success) {
//         setUser(data.user);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.log("Auto-login error:", error);
//       logout();
//     }
//   }
// };

//   fetchUser();
// }, []);

//   const generateImage = async (prompt) => {
//   try {
//     const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } });

//     if (data.success) {
//       setCredit(data.creditBalance); // तुरंत अपडेट करें
//       return data.resultImage;
//     } else {
//       toast.error(data.message);
//       setCredit(data.creditBalance);
//       if (data.creditBalance === 0) {
//         navigate('/BuyCredit');
//       }
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };
//   const logout=(()=>{
//     localStorage.removeItem('token')
//     setToken('')
//     setUser(null)
//   })
//   useEffect(()=>{
//     if(token){
//       loadCreditData()
//     }
//   },[token])
//   const value = {
//     user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditData,logout,generateImage
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    const fetchUser = async () => {
      const localToken = localStorage.getItem("token");
      if (!localToken) {
        setLoadingUser(false);
        return;
      }

      try {
        const { data } = await axios.post(
          `${backendUrl}/user/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );

        console.log("Response from profile API:", data);

        if (data.success) {
          setUser(data.user);

          // यहाँ credits की वैल्यू रिस्पॉन्स के हिसाब से लें
          // कभी credits सीधे रिस्पॉन्स में हो, कभी user के अंदर
          const creditsFromResponse = data.credits ?? data.user?.credits ?? 0;
          setCredits(creditsFromResponse);

          setToken(localToken);

          // अगर credits > 0 हैं तो home पे नेविगेट करें
          if (creditsFromResponse > 0) {
            navigate("/");
          } else {
            // नहीं तो BuyCredit पर
            navigate("/BuyCredit");
          }

          console.log("User credits set:", creditsFromResponse);
        } else {
          logout(false);
        }
      } catch (error) {
        console.error("Auto-login error:", error);
        logout(false);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async (redirect = true) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.post(
          `${backendUrl}/user/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success("Logged out successfully");
        } else {
          toast.error(res.data.message || "Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Logout failed");
      }
    }

    setUser(null);
    setCredits(0);
    setToken(null);
    localStorage.clear();

    if (redirect) {
      navigate("/");
    }
  };

  // Credits update helper
  const updateCredits = (newCredits) => {
    setCredits(newCredits);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        credits,
        setCredits,
        token,
        setToken,
        showLogin,
        setShowLogin,
        backendUrl,
        logout,
        updateCredits,
        loadingUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;





