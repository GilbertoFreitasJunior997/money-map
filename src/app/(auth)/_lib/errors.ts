export class AuthGithubError extends Error {
  message = "This email is associated to a Github account";
}

export class AuthGoogleError extends Error {
  message = "This email is associated to a Google account";
}

export class AuthInvalidDataError extends Error {
  message = "Incorrect email or password";
}

export class AuthUserNotAuthenticatedError extends Error {
  message = "User not authenticated";
}
