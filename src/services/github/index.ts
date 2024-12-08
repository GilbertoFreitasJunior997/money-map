import { userService } from "../user";
import { GithubUser } from "./types";

const { create, getByColumn } = userService;

export const githubService = {
  getAccountByGithubId: async (githubId: string) => {
    const [user] = await getByColumn("githubId", githubId);

    return user;
  },
  createGithubUser: async ({
    id: githubId,
    email,
    login: name,
  }: GithubUser) => {
    const createdUser = await create({ name, email, githubId });

    return createdUser;
  },
};
