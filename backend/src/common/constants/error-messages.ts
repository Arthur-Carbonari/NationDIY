export default class ErrorMessage {
  static readonly REQUIRED_FIELD_EMPTY = 'This field is required.';
  static readonly EMAIL_ALREADY_REGISTERED = 'The email address you entered is already registered.';
  static readonly PASSWORDS_DO_NOT_MATCH = 'The passwords you entered do not match.';
  static readonly INVALID_CREDENTIALS = 'Invalid email or password.';
  static readonly INTERNAL_SERVER_ERROR = 'Something went wrong on our end. Please try again later.';
  static readonly INVALID_EMAIL: "Please enter a valid email address.";
  static readonly USERNAME_TAKEN: "This username is already taken. Please choose a different username.";
  static readonly USERNAME_MIN_LENGTH = "Username needs to be at least 5 characters long."
  static readonly WEAK_PASSWORD: "Your password should be at least 8 characters long and include a combination of uppercase and lowercase letters, numbers, and symbols."
  static readonly INVALID_URL: "Invalid URL"
  // Add more error messages as needed
}
