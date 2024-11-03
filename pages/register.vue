<script setup lang="ts">
import EyeSlash from "@/assets/icons/EyeSlash.svg";
import EyeOpen from "@/assets/icons/EyeOpen.svg";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
useHead({
    title: "Nuxt Dashboard | Register ",
});
definePageMeta({
    middleware: "un-auth",
});

interface RegisterForm {
    username?: string | null;
    email?: string | null;
    password?: string | null;
}

const showPassword = ref(false);

const schema = toTypedSchema(
    yup.object({
        username: yup.string().required().min(3),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    })
);

const { values, errors, defineField, handleSubmit } = useForm<RegisterForm>({
    validationSchema: schema,
});

const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email", {
    validateOnModelUpdate: false,
});
const [password, passwordAttrs] = defineField("password", {
    validateOnModelUpdate: false,
});

const handleSignUp = handleSubmit(async (values: RegisterForm) => {
    // Handle form submission logic here
    console.log(values);
    alert("Sign Up");
});
</script>

<template>
    <div class="page-wrapper">
        <div class="background">
            <div class="circle"></div>
        </div>

        <div class="form-wrapper" @submit.prevent="handleSignUp">
            <div class="container">
                <h1 style="margin-bottom: 20px">Sign Up for an Account</h1>
                <form>
                    <!-- username -->
                    <div class="input-wrapper">
                        <input
                            v-model="username"
                            v-bind="usernameAttrs"
                            type="text"
                            placeholder="Username"
                        />
                        <img src="@/assets/icons/user.svg" />
                    </div>
                    <ErrorMsg v-if="errors.username" :error="errors.username" />

                    <!-- email -->
                    <div class="input-wrapper">
                        <input
                            v-model="email"
                            v-bind="emailAttrs"
                            type="email"
                            placeholder="Email"
                        />
                        <img src="@/assets/icons/EnvelopeSimple.svg" />
                    </div>
                    <ErrorMsg v-if="errors.email" :error="errors.email" />

                    <!-- password -->
                    <div class="input-wrapper">
                        <input
                            v-model="password"
                            v-bind="passwordAttrs"
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
                    <!-- error message -->
                    <ErrorMsg v-if="errors.password" :error="errors.password" />

                    <div class="terms-and-conditions">
                        <CustomCheckBtn />
                        <p>
                            By creating an account means you agree to the
                            <b>Terms & Conditions</b> and our
                            <b> Privacy Policy</b>
                        </p>
                    </div>
                    <button type="submit" class="btn">Sign Up</button>
                    <div style="text-align: center">
                        Already have an account?
                        <NuxtLink to="/login">Log In</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
form > p {
    color: hsla(240, 2%, 53%, 1);
    font-size: 12px;
}

.terms-and-conditions {
    display: flex;
    align-items: center;
    gap: 10px;
}
.terms-and-conditions input {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.terms-and-conditions p {
    color: hsla(240, 2%, 53%, 1);
    font-size: 12px;
}

.terms-and-conditions b {
    color: black;
}
</style>
