export const createNewUser = async (url, newUserObj) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newUserObj),
  });
  const data = await res.json();
  return data;
};
