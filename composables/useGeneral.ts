export const getPagesCount = (totalUsersNum: number, limit: number = 7) => {
  return totalUsersNum > 0 ? Math.floor(totalUsersNum / limit) + 1 : 1;
};
