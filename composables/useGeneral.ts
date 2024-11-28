export const getPagesCount = (totalUsersNum: number, limit: number = 7) => {
  return totalUsersNum > 0
    ? Math.floor(totalUsersNum / limit) + (totalUsersNum % limit > 0 ? 1 : 0)
    : 1;
};
