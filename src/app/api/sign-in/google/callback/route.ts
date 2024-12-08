import { appConfig } from "@/app-config";
import { setSession } from "@/lib/session";
import { googleService } from "@/services/google";
import {
  googleAuth,
  googleCodeCookie,
  googleStateCookie,
} from "@/services/google/consts";
import { GoogleUser } from "@/services/google/types";
import { userService } from "@/services/user";
import { ArcticFetchError, OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const jar = await cookies();
  const storedState = jar.get(googleStateCookie);
  const codeVerifier = jar.get(googleCodeCookie);

  if (
    !code ||
    !state ||
    !storedState?.value ||
    state !== storedState.value ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier.value,
    );

    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await response.json();

    const { createGoogleUser, getAccountByGoogleId } = googleService;

    const existingUser = await getAccountByGoogleId(googleUser.sub);

    if (existingUser) {
      await setSession(existingUser.id);

      jar.delete(googleStateCookie);
      jar.delete(googleCodeCookie);

      return new Response(null, {
        status: 302,
        headers: {
          Location: appConfig.redirectSignInURL,
        },
      });
    }

    const [emailAlreadyRegistered] = await userService.getByColumn(
      "email",
      googleUser.email,
    );

    if (emailAlreadyRegistered) {
      const { id } = emailAlreadyRegistered;
      await userService.update(id, { googleId: googleUser.sub });
      await setSession(id);

      return new Response(null, {
        status: 302,
        headers: {
          Location: appConfig.redirectSignInURL,
        },
      });
    }

    const user = await createGoogleUser(googleUser);
    await setSession(user.id);

    jar.delete(googleStateCookie);
    jar.delete(googleCodeCookie);

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
