export default class Auth {
  static authenticate = async payload => {
    // const _url = "http://localhost:8000/login";
    let response = {};
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // };
    // await fetch(_url, requestOptions)
    //   .then(response => response.json())
    //   .then(res => (response = res));
    // return response;

    const { email, password } = payload;

    console.log("payload", payload);
    if (!email || !password) {
      response["isSuccess"] = false;
      response["data"] = "Email and Password cannot Be empty";
    } else if (email == "asalheen1997@gmail.com" && password == "test") {
      console.log("success>>");
      response["isSuccess"] = true;
      response["data"] = payload;
    } else {
      response["isSuccess"] = false;
      response["data"] = "Invalid Email/Password";
    }
    return response;
  };

  static register = async payload => {
    // const _url = "http://localhost:8000/register";
    let response = {};
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // };
    // await fetch(_url, requestOptions)
    //   .then(response => response.json())
    //   .then(res => (response = res));

    response["isSuccess"] = true;
    response["data"] = payload;
    return response;
  };

  static newsArticle = async () => {
    const _url = "http://www.mocky.io/v2/5d8686a032000024b607b40e";
    let response = {};
    try {
      await fetch(_url)
        .then(response => response.json())
        .then(res => {
          response = res.articles;
        });
      return response;
    } catch (error) {}
  };
}
