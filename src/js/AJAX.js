export const AJAX = async function (url, timeoutSec, uploadData = undefined) {
  const timeout = function (s) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(`Request took too long! Timeout after ${s} second`), s * 1000);
    });
  };

  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(timeoutSec)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
