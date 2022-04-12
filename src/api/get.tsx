export const get_AllClients: any = async (val: any) => {
  const url = `https://pikel-it.com/finapp/clients/get.php?token=${val}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const get_AllSources: any = async (val: any) => {
  const url = `https://pikel-it.com/finapp/sources/get.php?clientId=${val}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getTransactionDetails = async (id: any) => {
  // const url = `https://pikel-it.com/finapp/transactions/get.php?sourceId=61c9cb36ebfac`;
  const url = `https://pikel-it.com/finapp/transactions/get.php?sourceId=${id}`;

  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const get_CSV = async (id: any) => {
  const url = `https://pikel-it.com/finapp/csvs/get.php?sourceId=${id}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const get_Dropdown = async (name: any) => {
  const url = `https://pikel-it.com/finapp/LOV/get.php?type=${name}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getType = async (clientId: any) => {
  const url = `https://pikel-it.com/finapp/LOV/get.php?type=TRANS_TYPE&clientId=${clientId}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getSubtypeValuesForType = async (type: any) => {
  const url = `https://pikel-it.com/finapp/LOV/get.php?type=TRANS_SUB_TYPE&parent=${type}`;
  return fetch(url, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
