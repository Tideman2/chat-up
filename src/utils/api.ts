export let BASEURL = "http://127.0.0.1:5000";

export let checkIfTokenHasExpired = async (name: string, userId: string) => {
  let url = BASEURL + "/auth/get_token";
  let userData = { username: name, userId: String(userId) };
  console.log(userData.userId, userData.username);
  if (
    localStorage.getItem("tokenExpiresIn") &&
    localStorage.getItem("accessToken")
  ) {
    console.log(userData.userId, userData.username);
    let tokenExpirationTime = localStorage.getItem("tokenExpiresIn");
    if (!tokenExpirationTime) {
      throw new Error("No token expiration time found");
    }

    console.log(tokenExpirationTime, Date.now());
    console.log(Date.now() > JSON.parse(tokenExpirationTime));
    let pasrsedTokenExpTime = JSON.parse(tokenExpirationTime);
    if (Date.now() > Number(pasrsedTokenExpTime)) {
      try {
        console.log("expired");
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response.status === 200) {
          let data = await response.json();
          console.log(data, "This is where data for new token comes first");
          console.log(data["access-token"]);
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
