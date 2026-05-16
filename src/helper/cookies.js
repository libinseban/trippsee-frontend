const Cookies = {
  get: function (name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        const value = decodeURIComponent(c.substring(nameEQ.length));
        console.log(`Getting cookie ${name}:`, value);
        return value;
      }
    }
    console.log(`Cookie ${name} not found`);
    return null;
  },

  set: function (name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const secureFlag = window.location.protocol === 'https:' ? "Secure; SameSite=Strict" : "SameSite=Lax";

    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; ${secureFlag}`;
    document.cookie = cookieString;
    console.log(`Setting cookie ${name}:`, value);
    console.log('Full cookie string:', cookieString);
  },

  remove: function (name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Attempting to remove cookie ${name}`);

    if (this.get(name)) {
      console.warn(`Cookie ${name} was not removed properly.`);
    } else {
      console.log(`Cookie ${name} successfully removed.`);
    }
  },
};

export default Cookies;
