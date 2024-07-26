// ----------------------------------------------------------------------



const randomNumber = Math.floor(Math.random() * 25) + 1;
console.log(randomNumber);

const currentFileUrl = import.meta.url;
const currentDirUrl = currentFileUrl.substring(0, currentFileUrl.lastIndexOf('/'));

const avatarUrl = new URL(`/assets/images/avatars/avatar_${randomNumber}.jpg`, currentDirUrl).href;

export const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: avatarUrl,
};
