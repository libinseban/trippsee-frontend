const backendDomain = "https://tech-cart.onrender.com";

const SummaryApi = () =>{
    return {
        signUp: {
            url: `${backendDomain}/api/user/signup`,
            method: 'post'
        },
        signIn: {
            url: `${backendDomain}/api/user/signin`,
            method: 'post'
        },
        current_user: {
            url: `${backendDomain}/api/user-details`,
            method: 'get'
        },
        logout: {
            url: `${backendDomain}/api/user/logout`,
            method: 'post'
        },
        user: {
            url: `${backendDomain}/api/user/forgotpassword`,
            method: 'post'
        },
        reset: {
            url: `${backendDomain}/api/user/reset-password`,
            method: 'post'
        },
        upload: {
            url: `${backendDomain}/api/user/upload`,
            method: 'post'
        }
    };
}

export default {SummaryApi};
