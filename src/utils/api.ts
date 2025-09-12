export let BASEURL = "http://127.0.0.1:5000";

export let checkIfTokenHasExpired = async (userData: any) => {
  let url = BASEURL + "/auth/get_token";

  if (
    localStorage.getItem("tokenExpiresIn") &&
    localStorage.getItem("accessToken")
  ) {
    console.log(userData);
    let tokenExpirationTime = localStorage.getItem("tokenExpiresIn");
    console.log(tokenExpirationTime, Date.now());
    if (Date.now() > Number(tokenExpirationTime)) {
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
          console.log(data);
          //set new tokenExpirationTime
          const now = Date.now(); // current time in ms
          const tokenExpirationTime = now + 1800 * 1000;
          localStorage.setItem(
            "tokenExpiresIn",
            JSON.stringify(tokenExpirationTime)
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
