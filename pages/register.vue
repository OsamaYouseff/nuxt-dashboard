<script setup lang="ts">
import EyeSlash from "@/assets/icons/EyeSlash.svg";
import EyeOpen from "@/assets/icons/EyeOpen.svg";
useHead({
    title: "Nuxt Dashboard | Register ",
});

const showPassword = ref(false);

const handleSignUp = () => {
    alert("Sign Up");
};
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
                    <div class="input-wrapper">
                        <input type="text" placeholder="Username" />
                        <img src="@/assets/icons/user.svg" />
                    </div>

                    <!-- email -->
                    <div class="input-wrapper">
                        <input type="email" placeholder="Email" />
                        <img src="@/assets/icons/EnvelopeSimple.svg" />
                    </div>
                    <!-- password -->
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

                    <p class="flex" style="gap: 3px">
                        <img
                            v-show="false"
                            src="@/assets/icons/info.svg"
                            alt="info-icons"
                        />
                        <span>
                            Your password must have at least 8 characters
                        </span>
                    </p>
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
