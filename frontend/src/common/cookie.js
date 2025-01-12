export const createCookie = (value,name = 'dailyBasket', day = 90) => {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + day);
    expiryDate = expiryDate.toISOString();
    const maxAge = day * 24 * 60 * 60;
    document.cookie = `${name}=${value}; path=/; expires=${expiryDate}; max-age=${maxAge}`;
};
export const getCookie = (name = 'dailyBasket') => {
    let nameEq = name + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nameEq) === 0) {
            return c.substring(nameEq.length, c.length);
        }
    }
    return '';
};

export const eraseCookie = (name) => {
    createCookie('', name, -1);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const checkCookie = (name = 'dailyBasket') => {
    return getCookie(name).length !== 0;
};
export const deleteAllCookies = () => {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
