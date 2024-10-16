const PROXY = `const getUrl = () => {
  if (typeof process !== "undefined" && process.env.FASTBFF_URL)
    return process.env.FASTBFF_URL;

  return (
    window.___fullstack.apiUrl ||
    import.meta.env.FASTBFF_URL ||
    import.meta.env.VITE_FASTBFF_URL
  );
};

const callFetch = async (serviceName, methodName, data) => {
  const url = getUrl();

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify([serviceName, methodName, data]),
  });

  if (response.status < 300) {
    try {
      return response.json();
    } catch (err) {
      console.log("[FAST-BFF] Please, use json to reponse server functions");
    }
  }

  throw { code: response.status, response };
};

window.___fullstack = { callFetch };
`;

export default PROXY;
