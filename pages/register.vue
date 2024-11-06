<script setup lang="ts">
import EyeSlash from "@/assets/icons/EyeSlash.svg";
import EyeOpen from "@/assets/icons/EyeOpen.svg";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { setTokens } from "@/composables/auth";
import * as yup from "yup";
import type { RegisterForm } from "@/types/RegisterForm";
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION, IS_EMAIL_AVAILABLE } from "@/graphql/mutations/user";


useHead({ title: "Nuxt Dashboard | Register " });
definePageMeta({ middleware: "un-auth" });


const showPassword = ref(false);


// Validation
const schema = toTypedSchema(
    yup.object({
        username: yup.string().required().min(3),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    })
);
const { values, errors, defineField, handleSubmit } = useForm<RegisterForm>({ validationSchema: schema, });
const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email", { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField("password", { validateOnModelUpdate: false });




// Register Logic using GraphQL
const userInfo = reactive({
    username: "NewUser",
    email: "NewUser@mail.com",
    password: "12345678",
    role: "admin",
    avatar: "https://via.placeholder.com/150",
});

const { mutate: addUser, loading, error } = useMutation(CREATE_USER_MUTATION, () => ({
    variables: {
        data: {
            name: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            role: userInfo.role,
            avatar: userInfo.avatar
        }
    }
}));

const { mutate: loginUser, loading: loading2, error: error2 } = useMutation(LOGIN_USER_MUTATION, () => ({
    variables: {
        email: userInfo.email,
        password: userInfo.password
    }
}));



// handlers
const handleSignUp = async () => {

    // TODO : Check if email is available

    // const { data, error } = await useQuery(IS_EMAIL_AVAILABLE, () => ({
    //     variables: {
    //         email: userInfo.email
    //     }
    // }));
    // console.log(error.value)
    // return


    if (!userInfo.username || !userInfo.email || !userInfo.password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const { data: registerResponse } = await addUser() as any;

        if (registerResponse) {
            const { data: loginResponse } = await loginUser() as any;

            if (loginResponse) {
                setTokens(loginResponse.login.access_token, loginResponse.login.refresh_token);
                // console.log("User added successfully", loginResponse);
                navigateTo("/user/listings")
            }

        };

    } catch (err) {
        console.error("Error creating user:", err);
    }
};

</script>

<template>
    <div class="page-wrapper">
        <div class="background">
            <div class="circle"></div>
        </div>

        <div class="form-wrapper" @submit.prevent="handleSignUp">
            <div style="width: 50vw; position: relative">
                <spinner style="transform: translateY(-20%); height: 100vh" v-if="loading || loading2" />
            </div>

            <ErrorComponent v-if="error || error2"
                :error="{ myMessage: 'Failed to Register', apiMessage: error || error2 }" />

            <div v-else class="container">
                <h1 style="margin-bottom: 20px">Sign Up for an Account</h1>
                <form>
                    <!-- username -->
                    <div class="input-wrapper">
                        <input v-model="userInfo.username" type="text" placeholder="Username" />
                        <img src="@/assets/icons/user.svg" />
                    </div>
                    <!-- <ErrorMsg v-if="errors.username" :error="errors.username" /> -->

                    <!-- email -->
                    <div class="input-wrapper">
                        <input v-model="userInfo.email" type="email" placeholder="Email" />
                        <img src="@/assets/icons/EnvelopeSimple.svg" />
                    </div>
                    <!-- <ErrorMsg v-if="errors.email" :error="errors.email" /> -->

                    <!-- password -->
                    <div class="input-wrapper">
                        <input v-model="userInfo.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password" />
                        <img src="@/assets/icons/LockKey.svg" />
                        <div class="show-password">
                            <img @click="showPassword = !showPassword" class="eye" style="right: 0 !important"
                                :src="showPassword ? EyeSlash : EyeOpen" />
                        </div>
                    </div>
                    <!-- error message -->
                    <!-- <ErrorMsg v-if="errors.password" :error="errors.password" /> -->

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
form>p {
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
