export const BASEURL = "http://127.0.0.1:5000";
const TOKEN_EXPIRY_SECONDS = 1800; // 30 minutes in seconds

//re-cursive function
export const checkIfTokenHasExpired = async (
  name?: string,
  userId?: string
): Promise<boolean> => {
  const url = BASEURL + "/auth/get_token";

  // If no name means user data is lost.
  // We get the name stored in localStorage
  if (!name || !userId) {
    try {
      const data = localStorage.getItem("userDetails");
      if (!data) {
        console.error("No user details found in localStorage");
        return false;
      }

      const parsedData = JSON.parse(data);
      const storedName = parsedData.name;
      const storedUserId = parsedData.userId;

      if (!storedName || !storedUserId) {
        console.error("Invalid user details in localStorage");
        return false;
      }

      // Recursively call with stored data
      return await checkIfTokenHasExpired(storedName, storedUserId);
    } catch (error) {
      console.error("Failed to get user details from localStorage:", error);
      return false;
    }
  }

  // Check if tokens exist
  const accessToken = localStorage.getItem("accessToken");
  const tokenExpirationTime = localStorage.getItem("tokenExpiresIn");

  if (!accessToken || !tokenExpirationTime) {
    console.error("No access token found, user needs to login");
    return false;
  }

  try {
    const parsedTokenExpTime = Number(tokenExpirationTime);

    // Check if token is still valid (not expired)
    if (Date.now() <= parsedTokenExpTime) {
      console.log("Token is still valid");
      return true;
    }

    console.log("Token has expired, refreshing...");

    // Token expired, get new one
    const userData = { username: name, userId: String(userId) };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("New Token received", data);

      if (data["access-token"]) {
        // Save the new token
        localStorage.setItem("accessToken", data["access-token"]);

        // Save the new expiration time (30 minutes from now)
        const newExpiration = Date.now() + TOKEN_EXPIRY_SECONDS * 1000;
        localStorage.setItem("tokenExpiresIn", String(newExpiration));
        return true;
      }
    }

    console.error(`Token refresh failed with status: ${response.status}`);
    return false;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return false;
  }
};
