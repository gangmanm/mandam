
const SETTING = import.meta.env.VITE_SETTING;
const SERVER_URL = SETTING === "dev" ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_SERVER_URL;

export const getUser = async () => {
    const response = await fetch(`${SERVER_URL}/user/get-user`, {
        method: "GET",
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
};
