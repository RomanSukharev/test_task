export const useAuthStore = defineStore("auth", () => {
  const token = ref<any>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const user = ref<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          token.value = data.token;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", token.value);
          }
          window.location.href = "/notes";
        } else {
          console.error("Failed to login: No token received");
          throw new Error("Failed to login: No token received");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  };

  const checkToken = async () => {
    if (token.value === null) {
      return false;
    }
    try {
      const response = await fetch("http://localhost:8000/api/check_token/", {
        headers: {
          Authorization: `Token ${token.value}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.status === "OK";
      }
      else{
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Token validation failed", error);
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  return {
    token,
    user,
    login,
    checkToken,
    logout,
  };
});
