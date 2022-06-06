function LocalStorage() {
  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function get(key, fallback) {
    let val = fallback;
    try {
      const value = JSON.parse(localStorage.getItem(key));
      if (value) {
        val = value;
      }
    } catch (e) {
      localStorage.setItem(key, JSON.stringify(fallback));
    }
    return val;
  }
  return { set, get };
}

export default LocalStorage();
