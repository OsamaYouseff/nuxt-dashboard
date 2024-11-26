import type { User } from "@/types/User";

export const toggleBlockUser = (id: number) => {
  const blockedUsersIds = JSON.parse(
    localStorage.getItem("blockedUsersIds") || "[]"
  );

  if (!blockedUsersIds.includes(id)) {
    localStorage.setItem(
      "blockedUsersIds",
      JSON.stringify([...blockedUsersIds, id])
    );
    localStorage.setItem("currentTab", "blocked");
  } else {
    localStorage.setItem(
      "blockedUsersIds",
      JSON.stringify([...blockedUsersIds.filter((item: number) => item !== id)])
    );
    localStorage.setItem("currentTab", "active");
  }

  window.location.href = "/user/listings";
};

export const handelFilterUsers = (
  result: globalThis.Ref<any, any>,
  type: string = "active",
  blockedUsersIds: number[],
  searchValue: string = ""
): User[] => {
  if (!result.value?.users) {
    return [];
  }

  const deletedUsersIds = JSON.parse(
    localStorage.getItem("deletedUsersIds") || "[]"
  );

  if (searchValue.trim() !== "") {
    switch (type) {
      case "active":
        return result.value?.users
          .filter((user: User) => !blockedUsersIds.includes(user.id))
          .filter((user: User) =>
            user.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
          .filter((user: User) => !deletedUsersIds.includes(user.id));

      case "blocked":
        return result.value?.users
          .filter((user: User) => blockedUsersIds.includes(user.id))
          .filter((user: User) =>
            user.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
          .filter((user: User) => !deletedUsersIds.includes(user.id));
    }
  } else {
    switch (type) {
      case "active":
        return result.value?.users
          .filter((user: User) => !blockedUsersIds.includes(user.id))
          .filter((user: User) => !deletedUsersIds.includes(user.id));

      case "blocked":
        return result.value?.users
          .filter((user: User) => blockedUsersIds.includes(user.id))
          .filter((user: User) => !deletedUsersIds.includes(user.id));
    }
  }

  return result.value?.users;
};

export const handleDeleteUser = (id: number) => {
  const deletedUsersIds = JSON.parse(
    localStorage.getItem("deletedUsersIds") || "[]"
  );

  localStorage.setItem(
    "deletedUsersIds",
    JSON.stringify([...deletedUsersIds, id])
  );
  window.location.href = "/user/listings";
};
