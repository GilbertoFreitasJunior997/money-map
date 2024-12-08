import { appConfig } from "@/app-config";
import { setSession } from "@/lib/session";
import { githubService } from "@/services/github";
import { github, githubStateCookie } from "@/services/github/consts";
import { GithubEmail, GithubUser } from "@/services/github/types";
import { userService } from "@/services/user";
import { ArcticFetchError, OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const jar = await cookies();
  const storedState = jar.get(githubStateCookie);

  if (!code || !state || !storedState || state !== storedState?.value) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    const accessToken = tokens.accessToken();

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser: GithubUser = await githubUserResponse.json();

    const { createGithubUser, getAccountByGithubId } = githubService;

    const existingUser = await getAccountByGithubId(githubUser.id);

    if (existingUser) {
      await setSession(existingUser.id);
      jar.delete(githubStateCookie);
      return new Response(null, {
        status: 302,
        headers: {
          Location: appConfig.redirectSignInURL,
        },
      });
    }

    if (!githubUser.email) {
      const githubUserEmailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const githubUserEmails = await githubUserEmailResponse.json();

      githubUser.email = getPrimaryEmail(githubUserEmails);
    }

    const [emailAlreadyRegistered] = await userService.getByColumn(
      "email",
      githubUser.email,
    );

    if (emailAlreadyRegistered) {
      const { id } = emailAlreadyRegistered;
      await userService.update(id, { githubId: githubUser.id });
      await setSession(id);

      return new Response(null, {
        status: 302,
        headers: {
          Location: appConfig.redirectSignInURL,
        },
      });
    }

    const user = await createGithubUser(githubUser);
    await setSession(user.id);

    jar.delete(githubStateCookie);
    return new Response(null, {
      status: 302,
      headers: {
        Location: appConfig.redirectSignInURL,
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      const code = e.code;

      return new Response(null, { status: 400, statusText: code });
    }
    if (e instanceof ArcticFetchError) {
      const cause = e.cause;

      return new Response(null, { status: 500, statusText: `${cause}` });
    }

    return new Response(null, { status: 500 });
  }
}

const getPrimaryEmail = (emails: GithubEmail[]) => {
  const primaryEmail = emails.find((email) => email.primary);

  return primaryEmail?.email ?? "";
};
