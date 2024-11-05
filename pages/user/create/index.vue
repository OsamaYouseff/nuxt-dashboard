<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import type { UserForm } from "@/types/UserForm";


useHead({ title: "Dashboard | Create User" });
definePageMeta({ layout: "dashboard", middleware: "auth" });


const userInfo = reactive({
  firstname: "test",
  lastname: "user2",
  email: "5Cj2P@example.com",
  password: "12345678",
  role: "admin",
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


// Create User Logic with graphql
const CREATE_USER_MUTATION = gql`
  mutation addUser($data: CreateUserDto!) {
    addUser(data: $data) {
      id
      name
      email
      role
      avatar
    }
  }
`;

const variables = {
  data: {
    name: `${userInfo.firstname} ${userInfo.lastname}`,
    email: userInfo.email,
    password: userInfo.password,
    role: userInfo.role,
    avatar: userInfo.avatar,
  },
};
const { mutate: addUser, loading, error } = useMutation(CREATE_USER_MUTATION, () => ({ variables }));

// Handlers
const handleCreateUser = async () => {
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
    <div class="nav-path flex" style="gap: 10px; margin-bottom: 20px; color: #101828">
      <NuxtLink to="/user/listings">Users</NuxtLink>
      <img src="@/assets/icons/next-arrow.svg" alt="next-icon" />
      <NuxtLink to="/user/create">Add User</NuxtLink>
    </div>

    <!-- Control Form -->
    <div class="control flex-between">
      <div>
        <h2 style="font-weight: 500; font-size: 18px; margin-bottom: 6px">
          Add user account
        </h2>
        <p style="
            font-size: 14px;
            font-weight: 400;
            line-height: 16.8px;
            color: #858589;
          ">
          Add photo and personal details here
        </p>
      </div>
      <div class="flex" style="gap: 10px">
        <button @click="resetForm">Rest</button>
        <button @click="handleCreateUser" class="add-user">Add</button>
      </div>
    </div>

    <!-- Profile form -->
    <div class="profile-form">
      <h2 style="margin: 20px 0px">Account info</h2>
      <form @click.prevent="" class="flex-col-center" style="gap: 25px">
        <!-- Name -->
        <div class="flex-between">
          <label for="name">Name</label>
          <div class="flex-between" style="gap: 10px; width: 512px">
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

          <div class="flex" style="gap: 20px;width: 512px;">
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

    <div class="flex-between" style="margin-top: 100px">
      <span></span>
      <div class="flex" style="gap: 10px">
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
  padding: 20px 30px;
}

a {
  color: #858589;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #dddcd8;
}

button img {
  width: 20px;
  height: 20px;
}

button.add-user {
  background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
  color: white;
}

button.add-user img {
  width: 25px;
  height: 15px;
}

.users-table {
  width: 100%;
  padding: 0;
  margin-top: 20px;
}

form {
  min-width: 800px;
  max-width: 800px;
  max-width: 70%;
}


.input-container {
  position: relative;
  flex: 1;
  justify-content: flex-end;
}

input:not([type="file"]) {
  min-width: 244px;
  max-width: 512px;
  width: 100%;
  height: 44px;
  border: 2px solid #dddcd8;
  padding: 0 15px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.input-wrapper>input:focus {
  border: 2px solid var(--secondary-color);
}

.error-message {
  position: absolute;
  top: -20px;
  margin-top: 5px;
  font-size: 11px;
  margin-top: 0px !important;
}

.img-container {
  position: relative;
  width: 58px;
  height: 58px;
  aspect-ratio: 1/1;
  background: #cacaca;
  border-radius: 50%;
}

.delete-btn {
  position: absolute;
  bottom: -3px;
  right: -4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  padding: 10px;
}

.delete-btn:hover {
  background: #eee;
  border-color: #e71f63;
}

.delete-btn img {
  width: 16px;
  height: 16px;
}

label {
  min-width: 200px;
}

h1,
h2,
label {
  color: #101828;
}
</style>
