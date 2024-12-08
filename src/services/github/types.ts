export type GithubUser = {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
};

export type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};
