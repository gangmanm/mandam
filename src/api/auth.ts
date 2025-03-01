export function sendEmail(email: string) {
    fetch('http://localhost:5017/auth/send-code', {
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
        const response = await fetch('http://localhost:5017/auth/verify-code', {
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
        const response = await fetch('http://localhost:5017/auth/store-signup', {
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
        const response = await fetch('http://localhost:5017/auth/signin', {
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
        return data.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}   