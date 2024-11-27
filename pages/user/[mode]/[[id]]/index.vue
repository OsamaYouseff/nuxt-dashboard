<script setup lang="ts">
import { ref } from "vue";
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from "@/graphql/mutations/user";
import { useMutation } from "@vue/apollo-composable";
import type { UserForm } from "@/types/UserForm";
import { uploadImage } from "~/composables/useCloudinary";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";

// Page Configurations
useHead({ title: "Dashboard | Create User" });
definePageMeta({ layout: "dashboard", middleware: "auth" });

const route = useRoute();
const userMode = ref("create");
const imageUrl = ref("");
const imgFile = ref<File | null>(null);

const GET_USER_QUERY = gql`
    query GetUser {
        user (id: ${route.params.id || 1}) {
            id
            email
            password
            name
            role
            avatar
            creationAt
            updatedAt
        }
    }
`;
const { result, loading, error } = useQuery(GET_USER_QUERY);
const user = computed(() => result?.value?.user);


// Validation Schema
const schema = toTypedSchema(
  yup.object({
    firstname: yup.string().required().min(3).trim(),
    lastname: yup.string().required().min(3).trim(),
    email: yup.string().email().required().trim(),
    password: yup.string().required().min(8),
    role: yup.string().required().trim(),
    avatar: yup.string().required().trim(),
  })
);
const { errors, defineField, resetForm, validate } = useForm<UserForm>({ validationSchema: schema });
const [firstname, firstnameAttrs] = defineField("firstname", { validateOnModelUpdate: false });
const [lastname, lastnameAttrs] = defineField("lastname", { validateOnModelUpdate: false });
const [email, emailAttrs] = defineField("email", { validateOnModelUpdate: false });
const [password, passwordAttrs] = defineField("password", { validateOnModelUpdate: false });
const [role, roleAttrs] = defineField("role", { validateOnModelUpdate: false });


const isFormChanged = () => {
  if (firstname.value !== user.value.name.split(" ")[0]) return true;
  else if (lastname.value !== user.value.name.split(" ")[1]) return true;
  else if (email.value !== user.value.email) return true;
  else if (role.value !== user.value.role) return true;
  else if (password.value !== user.value.password) return true;
  else if (user.value.avatar !== imageUrl.value) return true;
  return false;
}
const fillFormData = () => {

  if (userMode.value === "create") return
  firstname.value = user.value.name.split(" ")[0];
  lastname.value = user.value.name.split(" ")[1];
  email.value = user.value.email;
  password.value = user.value.password;
  role.value = user.value.role;
  imageUrl.value = user.value.avatar;
};


// Form Handlers
const handleCreateUser = async () => {

  const {
    mutate: addUser,
  } = useMutation(CREATE_USER_MUTATION, () => ({
    variables: {
      data: {
        name: `${firstname.value} ${lastname.value}`,
        email: email.value,
        password: password.value,
        role: role.value || "customer",
        avatar:
          imageUrl.value ||
          "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png",
      },
    },
  }));
  try {
    const result = await addUser();
    if (result) {
      console.log("User added successfully", result);
      alert("User has been created successfully");
      // navigateTo("/user/listings");
      window.location.href = "/user/listings";
    }
  } catch (err) {
    console.error("Error creating user:", err);
  }


}
const handleEditUser = async () => {
  const { mutate: updateUser } = useMutation(UPDATE_USER_MUTATION, () => ({
    variables: {
      id: user.value?.id,
      changes: {
        name: `${firstname.value} ${lastname.value}`,
        email: email.value,
        password: password.value,
        role: role.value || "customer",
        avatar:
          imageUrl.value ||
          "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png",
      },
    },
  }));

  try {
    const result = await updateUser();
    if (result) {
      console.log("User updated successfully", result);
      alert("User has been updated successfully");
      navigateTo("/user/listings");
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }

}
const handleUserActions = async () => {
  // check if there any changes or not in form 
  if (!isFormChanged()) {
    alert("No changes detected");
    return;
  }

  // manual form validation
  const isValid = await validate();
  if (!isValid) {
    console.log('Form has errors:', errors);
    return;
  }

  // handle uploading image
  // const fileInput = document.querySelector("input[type=file]") as HTMLInputElement;
  // const file = fileInput?.files?.[0];
  if (user.value.avatar !== imageUrl.value) {
    // Upload image to Cloudinary
    if (imgFile.value) {
      imageUrl.value = await uploadImage(imgFile.value);
    } else return
  }

  // invoke mutation
  if (userMode.value === "create") await handleCreateUser();
  else await handleEditUser();
};


// Watchers
watchEffect(() => {
  if (error.value) {
    console.error("Mutation error:", error.value);
  }
});
watch(result, (newResult: any) => {
  if (newResult) {
    fillFormData();
  }
});

onMounted(async () => {
  const mode = route.params.mode;
  if (mode === "create") {
    userMode.value = "create";
    resetForm();
  } else if (mode === "edit") {
    userMode.value = "edit";
    resetForm();
    fillFormData();
  } else {
    navigateTo("/error");
  }
});
</script>

<template>
  <div class="content-wrapper">
    <spinner v-if="loading" />

    <ErrorComponent v-if="error" :error="{ myMessage: 'Failed to Create User', apiMessage: error }" />

    <div class="container">
      <!-- header -->
      <header>
        <div class="flex">
          <h1 style="font-weight: 600">Users</h1>
        </div>
      </header>

      <!-- Nav path -->
      <div class="nav-path flex" style="gap: 0.625rem; margin-bottom: 1.25rem; color: #101828">
        <NuxtLink to="/user/listings">Users</NuxtLink>
        <img src="@/assets/icons/next-arrow.svg" alt="next-icon" />
        <NuxtLink :to="`/user/${userMode}`">{{ userMode }} user</NuxtLink>
      </div>

      <!-- Profile form -->
      <div class="profile-form">
        <div class="flex-between" style="border-bottom: 1px solid #eaeaea; padding-bottom: 20px">
          <!-- Control Form -->
          <div class="control flex-between">
            <div>
              <h2 style="
                  font-weight: 500;
                  font-size: 1.125rem;
                  margin-bottom: 0.375rem;
                ">
                Add user account
              </h2>
              <p style="
                  font-size: 0.875rem;
                  font-weight: 400;
                  line-height: 1.05rem;
                  color: #858589;
                  min-width: 200px;
                ">
                Add photo and personal details here
              </p>
            </div>
          </div>
          <div class="flex" style="gap: 0.625rem; justify-content: flex-end">
            <button @click="(e) => resetForm()">Rest</button>
            <button @click="handleUserActions" class="add-user">
              {{ userMode }}
            </button>
          </div>
        </div>
        <h2 style="margin: 1.25rem 0rem">Account info</h2>

        <form class="flex-col-center" style="gap: 1.5625rem">
          <!-- Name -->
          <div class="flex-between">
            <label for="name">Name</label>
            <div class="flex-between" style="gap: 0.625rem; width: 32rem">
              <div class="input-container flex">
                <input v-model="firstname" v-bind="firstnameAttrs" type="text" id="firstname"
                  placeholder="First Name" />
                <ErrorMsg v-show="errors.firstname" :error="errors.firstname" />
              </div>

              <div class="input-container flex">
                <input v-model="lastname" v-bind="lastnameAttrs" type="text" id="lastname" placeholder="Last Name" />
                <ErrorMsg v-show="errors.lastname" :error="errors.lastname" />
              </div>
            </div>
          </div>

          <!-- Email and Password -->
          <div class="flex-between">
            <label for="email">Email address</label>
            <div class="input-container flex">
              <input v-model="email" v-bind="emailAttrs" type="email" id="email" placeholder="Email Address" />
              <ErrorMsg v-show="errors.email" :error="errors.email" />
            </div>
          </div>

          <!-- Password -->
          <div class="flex-between">
            <label for="password">Password</label>
            <div class="input-container flex">
              <input v-model="password" v-bind="passwordAttrs" type="password" id="password" placeholder="Password" />
              <ErrorMsg v-show="errors.password" :error="errors.password" />
            </div>
          </div>

          <!-- Role -->
          <div class="flex-between">
            <label for="role">Role</label>
            <input disabled v-model="role" v-bind="roleAttrs" type="text" id="role" placeholder="customer" />
          </div>

          <!-- Photo -->
          <div class="flex-between">
            <label for="photo">Photo</label>
            <div class="input-container flex">
              <CustomFileInput :currentImgUrl="imageUrl" @update:currentImgUrl="imageUrl = $event"
                @update:imgFile="imgFile = $event" />
              <ErrorMsg v-show="errors.avatar" :error="errors.avatar" />
            </div>
          </div>
        </form>
        <div class="flex-between" style="margin-top: 6.25rem; width: 100%">
          <span></span>
          <div class="flex" style="gap: 0.625rem">
            <button @click="() => resetForm()">Rest</button>
            <button @click="handleUserActions" class="add-user">
              {{ userMode }}
            </button>
          </div>
        </div>
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
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0.625rem 1.25rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid #dddcd8;
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
  height: 0.9375rem;
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
  border: 0.125rem solid #dddcd8;
  padding: 0 0.9375rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  outline: none;
}

.input-wrapper>input:focus {
  border: 0.125rem solid var(--secondary-color);
}

.error-message {
  position: absolute;
  bottom: -1.4rem;
  left: 0;
  margin-top: 0.3125rem;
  font-size: 0.6875rem;
  margin-top: 0rem !important;
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
