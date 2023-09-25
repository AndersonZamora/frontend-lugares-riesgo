export const getEnvVariables = () => {

    const URL = import.meta.env.VITE_APP_BASE_URL;

    return {
        URL
    }
}