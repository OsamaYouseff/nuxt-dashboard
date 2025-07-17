<script setup lang="ts">
import EyeSlash from "@/assets/icons/EyeSlash.svg";
import EyeOpen from "@/assets/icons/EyeOpen.svg";
import { setTokens } from "@/composables/auth";
import type { LoginForm } from "@/types/LoginForm";
import { LOGIN_USER_MUTATION } from "@/graphql/mutations/user";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

useHead({ title: "Nuxt Dashboard | Register " });
definePageMeta({ middleware: "un-auth" });

const showPassword = ref(false);



// email: "ohn@mail.com",
// password: "hangeme",

// GraphQL API
const { mutate: loginUser, loading, error } = useMutation(LOGIN_USER_MUTATION,
    () => ({
        variables: {
            email: email.value,
            password: password.value,
        }
    })

);

// Validation
const schema = toTypedSchema(
    yup.object({
        email: yup.string().required().email().trim(),
        password: yup.string().required().min(8),
    })
);
const { errors, defineField, handleSubmit } = useForm<LoginForm>({
    validationSchema: schema,
});
const [email, emailAttrs] = defineField("email", { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField("password", {
    validateOnModelUpdate: false,
});

//// Handlers
const handleSignIn = handleSubmit(
    async () => {

        try {
            const { data } = await loginUser() as { data: { login: { access_token: string, refresh_token: string } } };;

            if (data.login.access_token && data.login.refresh_token) {
                setTokens(data.login.access_token, data.login.refresh_token);
                console.log(data.login)
                console.log("Login successful");
                navigateTo("/user/listings");
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    }
)

</script>

<template>
    <div class="page-wrapper">
        <div class="background">
            <div class="circle"></div>
        </div>

        <div class="form-wrapper" @submit.prevent="handleSignIn">
            <div style="width: 50vw; position: relative">
                <spinner style="transform: translateY(-20%); height: 70vh" v-if="loading" />
            </div>

            <ErrorComponent v-if="error" :error="{ myMessage: 'Failed to login', apiMessage: error }" />

            <div v-else class="container">
                <h1>Sign In to your Account</h1>
                <h2>Welcome back! please enter your detail</h2>
                <form>
                    <!-- Email -->
                    <div class="input-wrapper">
                        <input v-model="email" v-bind="emailAttrs" type="email" placeholder="Email : john@mail.com" />
                        <img src="@/assets/icons/EnvelopeSimple.svg" />
                    </div>
                    <ErrorMsg v-if="errors.email" :error="errors.email" />

                    <!-- Password -->
                    <div class="input-wrapper">
                        <input v-model="password" v-bind="passwordAttrs" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password : changeme" />
                        <img src="@/assets/icons/LockKey.svg" />
                        <div class="show-password">
                            <img @click="showPassword = !showPassword" class="eye" style="right: 0 !important"
                                :src="showPassword ? EyeSlash : EyeOpen" />
                        </div>
                    </div>
                    <ErrorMsg v-if="errors.password" :error="errors.password" />

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

    background: linear-gradient(179.94deg,
            rgba(255, 255, 255, 0.06) -5.48%,
            rgba(255, 255, 255, 0) 96.9%);
}

.form-wrapper {
    width: 50%;
    height: 100vh;
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

.input-wrapper>input:focus {
    border: 2px solid var(--secondary-color);
}

form>p {
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
