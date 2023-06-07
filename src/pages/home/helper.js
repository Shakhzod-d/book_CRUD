export const getBooks = async (
  METHOD = "GET",
  url = ``,
  key = ``,
  sign = ``
) => {
  try {
    const res = await fetch(url, {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
        key: key,
        sign: sign,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createNewBook = async (
  METHOD = "POST",
  url = ``,
  key = ``,
  sign = ``,
  obj
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: key,
        sign: sign,
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changeStatus = async (
  METHOD = "PATCH",
  url = ``,
  key = ``,
  sign = ``,
  obj
) => {
  try {
    const res = await fetch(url, {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
        key: key,
        sign: sign,
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
