<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import type { UserForm } from "@/types/UserForm";
import { CREATE_USER_MUTATION } from "@/graphql/mutations/user";

useHead({ title: "Dashboard | Create User" });
definePageMeta({ layout: "dashboard", middleware: "auth" });



const userInfo = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "customer",
  avatar: "https://via.placeholder.com/150",
});

// Validation
const schema = yup.object({
  firstname: yup.string().required().min(3),
  lastname: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  role: yup.string().required(),
  avatar: yup.string().required(),
});
const { values, errors, defineField, handleSubmit } = useForm<UserForm>({ validationSchema: toTypedSchema(schema) });
const [firstname, firstnameAttrs] = defineField("firstname");
const [lastname, lastnameAttrs] = defineField("lastname");
const [email, emailAttrs] = defineField("email", { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField("password", { validateOnModelUpdate: false });



const { mutate: addUser, loading, error } = useMutation(CREATE_USER_MUTATION, () => ({
  variables: {
    data: {
      name: `${userInfo.firstname} ${userInfo.lastname}`,
      email: userInfo.email,
      password: userInfo.password,
      role: userInfo.role,
      avatar: userInfo.avatar,
    }
  }
}));

// Handlers
const handleCreateUser = async () => {

  if (!userInfo.firstname || !userInfo.lastname || !userInfo.email || !userInfo.password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const result = await addUser();

    if (result) {
      console.log("User added successfully", result);
      resetForm();
      alert("User has been created successfully");
      navigateTo("/user/listings");
    }
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

const resetForm = () => {
  userInfo.firstname = "";
  userInfo.lastname = "";
  userInfo.email = "";
  userInfo.password = "";
  userInfo.role = "customer";
  userInfo.avatar = "https://via.placeholder.com/150";
};

// Watch for errors
watchEffect(() => {
  if (error.value) {
    console.error("Mutation error:", error.value);
  }
});


</script>

<template>
  <spinner v-if="loading" />

  <ErrorComponent v-if="error" :error="{ myMessage: 'Failed to Create User', apiMessage: error }" />

  <div v-else class="container">
    <!-- header -->
    <header>
      <div class="flex">
        <h1 style="font-weight: 600">Users</h1>
      </div>
    </header>

    <!-- Nav path -->
    <div class="nav-path flex" style="gap: .625rem; margin-bottom: 1.25rem; color: #101828">
      <NuxtLink to="/user/listings">Users</NuxtLink>
      <img src="@/assets/icons/next-arrow.svg" alt="next-icon" />
      <NuxtLink to="/user/create">Add User</NuxtLink>
    </div>

    <!-- Control Form -->
    <div class="control flex-between">
      <div>
        <h2 style="font-weight: 500; font-size: 1.125rem; margin-bottom: .375rem">
          Add user account
        </h2>
        <p style="
            font-size: .875rem;
            font-weight: 400;
            line-height: 1.05rem;
            color: #858589;
          ">
          Add photo and personal details here
        </p>
      </div>
      <div class="flex" style="gap: .625rem">
        <button @click="resetForm">Rest</button>
        <button @click="handleCreateUser" class="add-user">Add</button>
      </div>
    </div>

    <!-- Profile form -->
    <div class="profile-form">
      <h2 style="margin: 1.25rem 0rem">Account info</h2>
      <form @click.prevent="" class="flex-col-center" style="gap: 1.5625rem">
        <!-- Name -->
        <div class="flex-between">
          <label for="name">Name</label>
          <div class="flex-between" style="gap: .625rem; width: 32rem">
            <div class="input-container flex">
              <input v-model="userInfo.firstname" v-bind="firstnameAttrs" type="text" id="name"
                placeholder="First Name" />
              <!-- TODO Enable Error message -->
              <!-- <ErrorMsg v-show="errors.firstname" :error="errors.firstname" /> -->
            </div>

            <div class="input-container flex">
              <input v-model="userInfo.lastname" v-bind="lastnameAttrs" type="text" id="name" placeholder="Last Name" />
              <!-- <ErrorMsg v-show="errors.lastname" :error="errors.lastname" /> -->
            </div>
          </div>
        </div>
        <!-- Email and Password -->
        <div class="flex-between">
          <label for="email">Email address</label>
          <div class="input-container flex">
            <input v-model="userInfo.email" v-bind="emailAttrs" type="email" id="email" placeholder="Email Address" />
            <!-- <ErrorMsg v-show="errors.email" :error="errors.email" /> -->
          </div>
        </div>
        <!-- Password -->
        <div class="flex-between">
          <label for="password">Password</label>
          <div class="input-container flex">
            <input v-model="userInfo.password" v-bind="passwordAttrs" type="password" id="password"
              placeholder="Password" />
            <!-- <ErrorMsg v-show="errors.password" :error="errors.password" /> -->
          </div>
        </div>

        <!-- Role -->
        <div class="flex-between">
          <label for="role">Role</label>
          <input disabled v-model="userInfo.role" type="text" id="role" placeholder="Role" />
        </div>

        <!-- Photo -->
        <div class="flex-between">
          <label for="photo">Photo</label>

          <div class="flex" style="gap: 1.25rem;width: 32rem;">
            <div class="img-container">
              <img style="width: 100%; height: 100%; border-radius: 50%" src="@/assets/images/user2-img.png" alt="" />
              <span class="delete-btn flex-center">
                <img src="@/assets/icons/delete.svg" alt="" />
              </span>
            </div>

            <CustomFileInput />
          </div>
        </div>
      </form>
    </div>

    <div class="flex-between" style="margin-top: 6.25rem">
      <span></span>
      <div class="flex" style="gap: .625rem">
        <button @click="resetForm">Rest</button>
        <button @click="handleCreateUser" class="add-user">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 1.25rem 1.875rem;
}

a {
  color: #858589;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: .875rem;
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: .625rem 1.25rem;
  gap: .5rem;
  border-radius: .5rem;
  border: .0625rem solid #dddcd8;
}

button img {
  width: 1.25rem;
  height: 1.25rem;
}

button.add-user {
  background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
  color: white;
}

button.add-user img {
  width: 1.5625rem;
  height: .9375rem;
}

.users-table {
  width: 100%;
  padding: 0;
  margin-top: 1.25rem;
}

form {
  min-width: 50rem;
  max-width: 50rem;
  max-width: 70%;
}


.input-container {
  position: relative;
  width: 32rem;
  justify-content: flex-end;
}

input:not([type="file"]) {
  min-width: 15.25rem;
  max-width: 32rem;
  width: 100%;
  height: 2.75rem;
  border: .125rem solid #dddcd8;
  padding: 0 .9375rem;
  border-radius: .25rem;
  font-size: 1rem;
  outline: none;
}

.input-wrapper>input:focus {
  border: .125rem solid var(--secondary-color);
}

.error-message {
  position: absolute;
  top: -1.25rem;
  left: 0;
  margin-top: .3125rem;
  font-size: .6875rem;
  margin-top: 0rem !important;
}

.img-container {
  position: relative;
  width: 3.625rem;
  height: 3.625rem;
  aspect-ratio: 1/1;
  background: #cacaca;
  border-radius: 50%;
}

.delete-btn {
  position: absolute;
  bottom: -0.1875rem;
  right: -0.25rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: .0625rem solid transparent;
  padding: .625rem;
}

.delete-btn:hover {
  background: #eee;
  border-color: #e71f63;
}

.delete-btn img {
  width: 1rem;
  height: 1rem;
}

label {
  min-width: 12.5rem;
}

h1,
h2,
label {
  color: #101828;
}
</style>
