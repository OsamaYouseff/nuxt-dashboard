export const toggleBlockUser = (id: number) => {
  const blockedUsersIds = JSON.parse(
    localStorage.getItem("blockedUsersIds") || "[]"
  )
  
  if (!blockedUsersIds.includes(id)) {
    localStorage.setItem(
      "blockedUsersIds",
      JSON.stringify([...blockedUsersIds, id])
    );
  } else {
    localStorage.setItem(
      "blockedUsersIds",
      JSON.stringify([
        ...blockedUsersIds.filter((item: number) => item !== id),
      ])
    );
  }

  window.location.reload();
}; 
