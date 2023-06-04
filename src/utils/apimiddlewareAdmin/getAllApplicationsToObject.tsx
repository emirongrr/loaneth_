import getAllApplications from './getAllApplications';
import getUserById from './getUserById';

export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const res_applications = await getAllApplications(token);
  if (!res_applications.success) {
    return { success: false, message: res_applications?.message };
  }
  let non_applications = res_applications?.applications;
  let applications = [];
  non_applications.forEach(async (appl) => {
    let userRes = await getUserById(token, appl?.userId);
    if (userRes.success) {
      let user = userRes?.user;
      applications.push({
        id: appl.id,
        userId: user.id,
        userSince: appl.userSince,
        totalAssetValueInTRY: appl.totalAssetValueInTRY,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  });
  return { success: true, allApplications: applications };
}
