
const SETTING = import.meta.env.VITE_SETTING;
const SERVER_URL = SETTING === "dev" ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_SERVER_URL;

export function sendEmail(email: string) {
    fetch(`${SERVER_URL}/auth/send-code`, {
        method: 'POST',
        mode: 'cors', // CORS 문제를 해결하기 위한 설정
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email // 전송할 이메일 주소
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export async function verifyCode(email: string, code: string) {
    try {
        const response = await fetch(`${SERVER_URL}/auth/verify-code`, {
            method: 'POST',
            mode: 'cors', // CORS 문제를 해결하기 위한 설정
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                code: code
            })
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function storeSignUp(email: string, password: string, username: string) {
    try {
        const response = await fetch(`${SERVER_URL}/auth/store-signup`, {
            method: 'POST',
            mode: 'cors', // CORS 문제를 해결하기 위한 설정
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function signIn(email: string, password: string) {
    try {
        const response = await fetch(`${SERVER_URL}/auth/signin`, {
            method: 'POST',
            mode: 'cors', // CORS 문제를 해결하기 위한 설정
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}   


export async function checkUser() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        return false;
    }
    const response = await fetch(`${SERVER_URL}/auth/check-user-uuid`, {
        method: 'POST',
        mode: 'cors', // CORS 문제를 해결하기 위한 설정
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uuid: userId
        })
    });
    const data = await response.json();
    return data;
}
