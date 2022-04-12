export const delete_Source = async (client_id: any, source_Id: any) => {
  const url = `https://pikel-it.com/finapp/sources/delete.php?recId=${source_Id}&clientId=${client_id}`;

  return fetch(url, {
    method: "POST", // or 'PUT'
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

export const delete_CSV = async (csv_id: any, source_Id: any) => {
  const url = `https://pikel-it.com/finapp/csvs/delete.php?csvID=${csv_id}&sourceId=${source_Id}`;
  return fetch(url, {
    method: "POST", // or 'PUT'
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

export const delete_Transaction = async (id: any, source_Id: any) => {
  const url = `https://pikel-it.com/finapp/transactions/delete.php?recId=${id}&sourceId=${source_Id}`;
  return fetch(url, {
    method: "POST", // or 'PUT'
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
