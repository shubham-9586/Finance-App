export const login: any = async (email: any, password: any) => {
  const url = `https://pikel-it.com/finapp/login.php`;
  return fetch(url, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: email,
      passWord: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
