export function checkIfUserInfoInStorage(
  users: Record<string, any>[],
  action: Record<string, any>
): Record<string, any> | boolean {
  for (const user of users) {
    if (
      user.name === action.payload.name &&
      user.passWord === action.payload.passWord
    ) {
      return user;
    }
  }
  return false;
}
