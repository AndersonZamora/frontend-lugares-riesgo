export const getEnvVariables = () => {

    const URL = import.meta.env.VITE_APP_BASE_URL;
    const TOKEN = import.meta.env.VITE_APP_TOKEN;

    return {
        URL,
        TOKEN
    }
}