const PROXY = `const getUrl = () => {
  if (typeof process !== "undefined" && process.env.FASTBFF_URL)
    return process.env.FASTBFF_URL;

  return (
    import.meta.env.FASTBFF_URL ||
    import.meta.env.VITE_FASTBFF_URL ||
    "http://localhost:3000"
  );
};

const callFetch = async (serviceName, methodName, data) => {
  const url = getUrl();
  const token = await window.getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("company"))
    headers["x-company"] = localStorage.getItem("company");
  if (token) headers.Authorization = \`Bearer \${token}\`;

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

const proxy = (key) =>
  new Proxy(
    {},
    {
      get: function (target, prop) {
        return (...a) => {
          return callFetch(key, prop, a);
        };
      },
    }
  );

window.___fullstack = { proxy };
`;

export default PROXY;
