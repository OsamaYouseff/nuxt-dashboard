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
  } else {
    localStorage.setItem(
      "blockedUsersIds",
      JSON.stringify([...blockedUsersIds.filter((item: number) => item !== id)])
    );
  }

  window.location.reload();
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

  if (searchValue.trim() !== "") {
    switch (type) {
      case "active":
        return result.value?.users
          .filter((user: User) => !blockedUsersIds.includes(user.id))
          .filter((user: User) =>
            user.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          );

      case "blocked":
        return result.value?.users
          .filter((user: User) => blockedUsersIds.includes(user.id))
          .filter((user: User) =>
            user.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          );
    }
  } else {
    switch (type) {
      case "active":
        return result.value?.users.filter(
          (user: User) => !blockedUsersIds.includes(user.id)
        );

      case "blocked":
        return result.value?.users.filter((user: User) =>
          blockedUsersIds.includes(user.id)
        );
    }
  }

  return result.value?.users;
};
