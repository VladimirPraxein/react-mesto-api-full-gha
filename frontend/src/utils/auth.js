export const BASE_URL = 'https://api.mesto.project.student.nomoredomains.work';

function processRequest(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then(processRequest)
        .then((data) => {
            localStorage.setItem("token", data.token);
            return data;
        });
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(processRequest)
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            } else {
                return;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
        .then(processRequest)
} 