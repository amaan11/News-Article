export default class Auth {
  static authenticate = async payload => {
    console.log("authenticate>fgh>>", payload);
    const _url = "http://localhost:8000/login";

    let response = {};
    await fetch(_url, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(res => (response = res));
    return response;
  };

  static register = async payload => {
    const _url = "http://localhost:8000/register";

    await fetch(_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
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
    } catch (error) {
      console.log("errror>>>");
    }
  };
}
