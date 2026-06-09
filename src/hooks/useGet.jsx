// import { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// export function useGet(endpoint) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(!!endpoint);
//   const [error, setError] = useState(null);

//   const mountedRef = useRef(true);

//   const fetchData = useCallback(async () => {
//     if (!endpoint) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         `${BASE_URL}${endpoint}`,
//         {
//           headers: token
//             ? {
//                 Authorization: `Bearer ${token}`,
//               }
//             : {},
//         }
//       );

//       if (mountedRef.current) {
//         setData(response.data);
//       }

//     } catch (err) {

//       // Handle unauthorized session
//       if (err?.response?.status === 401) {

//         // remove invalid token
//         localStorage.removeItem("token");

//         if (mountedRef.current) {
//           setData(null);
//           setError("Session expired");
//         }

//         return;
//       }

//       if (mountedRef.current) {
//         setError(
//           err?.response?.data?.message ||
//           err?.message ||
//           "Something went wrong"
//         );
//       }

//     } finally {

//       if (mountedRef.current) {
//         setLoading(false);
//       }

//     }
//   }, [endpoint]);

//   useEffect(() => {
//     mountedRef.current = true;

//     if (!endpoint) return;

//     fetchData();

//     return () => {
//       mountedRef.current = false;
//     };

//     // eslint-disable-next-line
//   }, [endpoint]);

//   return {
//     data,
//     loading,
//     error,
//     refetch: fetchData,
//   };
// }



import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useGet(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!endpoint);
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}${endpoint}`,
        {
          headers: token
            ? {
              Authorization: `Bearer ${token}`,
            }
            : {},
        }
      );

      if (mountedRef.current) {
        setData(response.data);
      }

    } catch (err) {

      // Handle unauthorized session
      if (err?.response?.status === 401) {
        //console.log("401 received");
        //console.log("Token at time of 401:", localStorage.getItem("token"));

        return;
      }

      if (mountedRef.current) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
        );
      }

    } finally {

      if (mountedRef.current) {
        setLoading(false);
      }

    }
  }, [endpoint]);

  useEffect(() => {
    mountedRef.current = true;

    if (!endpoint) return;

    fetchData();

    return () => {
      mountedRef.current = false;
    };

    // eslint-disable-next-line
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}