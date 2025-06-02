import { apiGit } from 'src/boot/axios';

export const getUserInfoGit = async (username: string) => {
  const response = await apiGit.get(`/users/${username}`);
  return response.data;
};
