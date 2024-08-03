import { useState } from "react";

const useSignupContext = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setErrors] = useState(null);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/create-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        try {
          const errorData = await response.json();
          setErrors(errorData.message || "An error occurred");
        } catch (e) {
          // Fallback to plain text if JSON parsing fails
          const errorText = await response.text();
          setErrors(errorText || "An error occurred");
        }
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setErrors(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data,setErrors, error, signup };
};

export default useSignupContext;
