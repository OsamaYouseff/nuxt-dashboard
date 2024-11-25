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

export const filterUsers = (
  result: globalThis.Ref<any, any>,
  type: string = "active",
  blockedUsersIds: number[],
  searchValue: string = "",
  from: number = 0,
  to: number = 10
): User[] => {
  let filteredUsers = null;

  switch (type) {
    case "active":
      if (searchValue.trim() !== "") {
        return result.value?.users
          .filter((user: User) => !blockedUsersIds.includes(user.id))
          .filter((user: User) =>
            user.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
          .slice(from, to);
      } else {
        return result.value?.users
          .filter((user: User) => !blockedUsersIds.includes(user.id))
          .slice(from, to);
      }
    case "blocked":
      return result.value?.users
        .filter((user: User) => blockedUsersIds.includes(user.id))
        .filter((user: User) =>
          user.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        )
        .slice(from, to);
  }
};
