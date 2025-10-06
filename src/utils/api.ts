export let BASEURL = "http://127.0.0.1:5000";

export let checkIfTokenHasExpired = async (name: string, userId: string) => {
  let url = BASEURL + "/auth/get_token";
  let userData = { username: name, userId: String(userId) };
  if (
    localStorage.getItem("tokenExpiresIn") &&
    localStorage.getItem("accessToken")
  ) {
    let tokenExpirationTime = localStorage.getItem("tokenExpiresIn");
    if (!tokenExpirationTime) {
      throw new Error("No token expiration time found");
    }

    let pasrsedTokenExpTime = JSON.parse(tokenExpirationTime);
    if (Date.now() > Number(pasrsedTokenExpTime)) {
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response.status === 200) {
          let data = await response.json();
          if (data["access-token"]) {
            //set new tokenExpirationTime
            // Save the new token
            localStorage.setItem("accessToken", data["access-token"]);

            // Save the new expiration time 30Minutes
            const newExpiration = Date.now() + 1800 * 1000;
            localStorage.setItem("tokenExpiresIn", String(newExpiration));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
