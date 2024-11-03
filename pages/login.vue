<script setup lang="ts">
// imports
import EyeSlash from "@/assets/icons/EyeSlash.svg";
import EyeOpen from "@/assets/icons/EyeOpen.svg";

useHead({
    title: "Nuxt Dashboard | Register ",
});

definePageMeta({
    middleware: "un-auth",
});

const LOGIN_USER_MUTATION = gql`
    mutation {
        login(email: "john@mail.com", password: "changeme") {
            access_token
            refresh_token
        }
    }
`;

const showPassword = ref(false);

const loginInfo = ref({
    email: "john@mail.com",
    password: "changeme",
});

const { mutate: login, loading, error } = useMutation(LOGIN_USER_MUTATION);

// Store token function
const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

// Login function
const handleSignIn = async () => {
    try {
        const { data } = await login({
            variables: {
                email: loginInfo.value.email,
                password: loginInfo.value.password,
            },
        });

        console.log(data);

        if (data.login.access_token && data.login.refresh_token) {
            setTokens(data.login.access_token, data.login.refresh_token);
            console.log("Login successful");
            // Redirect the user after login, e.g., to a dashboard
            navigateTo("/user/listings");
        }
    } catch (err) {
        console.error("Login error:", err);
    }
};
</script>

<template>
    <div class="page-wrapper">
        <div class="background">
            <div class="circle"></div>
        </div>

        <div class="form-wrapper" @submit.prevent="handleSignIn">
            <div class="container">
                <h1>Sign In to your Account</h1>
                <h2>Welcome back! please enter your detail</h2>
                <form>
                    <div class="input-wrapper">
                        <input type="email" placeholder="Email" />
                        <img src="@/assets/icons/EnvelopeSimple.svg" />
                    </div>
                    <div class="input-wrapper">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Password"
                        />
                        <img src="@/assets/icons/LockKey.svg" />
                        <div class="show-password">
                            <img
                                @click="showPassword = !showPassword"
                                class="eye"
                                style="right: 0 !important"
                                :src="showPassword ? EyeSlash : EyeOpen"
                            />
                        </div>
                    </div>

                    <div class="Remember-me-container">
                        <div class="Remember-me">
                            <CustomCheckBtn />
                            <p>Remember me</p>
                        </div>
                        <nuxt-link to="#">Forget Password</nuxt-link>
                    </div>
                    <button type="submit" class="btn">Sign In</button>
                    <div style="text-align: center">
                        Don’t have an account?
                        <NuxtLink to="/register">Sign Up</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.page-wrapper {
    width: 100vw;
    margin: auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background {
    position: relative;
    width: 50%;
    min-width: 50%;
    height: 100vh;
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
}

.background .circle {
    position: absolute;
    min-width: 70%;
    max-width: 70%;
    aspect-ratio: 1/1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    background: linear-gradient(
        179.94deg,
        rgba(255, 255, 255, 0.06) -5.48%,
        rgba(255, 255, 255, 0) 96.9%
    );
}

.form-wrapper {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: start;
}

.container {
    display: flex;
    flex-direction: column;
}

h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    width: 100%;
}

h2 {
    font-size: 14px;
    font-weight: 400;
    line-height: 23.2px;
    color: hsla(240, 2%, 53%, 1);
    margin-bottom: 20px;
    text-align: start;
}

form {
    width: 400px;
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: 20px;
}

.input-wrapper {
    position: relative;
}

.input-wrapper img,
.show-password {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.input-wrapper img {
    left: 10px;
}

.show-password {
    right: 13% !important;
    cursor: pointer;
}
.eye {
    width: 25px;
}

input {
    width: 100%;
    max-width: 100%;
    height: 56px;
    border: 2px solid #dddcd8;
    padding: 0 10px 0 40px;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
}
.input-wrapper > input:focus {
    border: 2px solid var(--secondary-color);
}
form > p {
    color: hsla(240, 2%, 53%, 1);
    font-size: 12px;
}

.Remember-me-container,
.Remember-me {
    display: flex;
    align-items: center;
}

.Remember-me-container {
    widows: 100%;
    justify-content: space-between;
}

.Remember-me {
    gap: 10px;
}
.Remember-me input {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.Remember-me p {
    color: black;
    font-size: 14px;
}

.btn {
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
    color: white;
    font-weight: 700;
    border-radius: 4px;
    border: none;
    height: 56px;
    cursor: pointer;
    border-radius: 100px;
    font-size: 16px;
}

a {
    color: var(--secondary-color);
    font-weight: 700;
}
</style>
