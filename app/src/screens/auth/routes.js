// Auth area routes. "auth/login" is the canonical app entry (BUILDERS.md).
// Sheet-only steps — the slider captcha (CaptchaSheet) and the Google
// account chooser (GoogleChooserSheet) — are intentionally NOT routes.
import { LoginScreen } from "./LoginScreen.jsx";
import { PasswordScreen } from "./PasswordScreen.jsx";
import { TwoFaScreen } from "./TwoFaScreen.jsx";
import { SignUpScreen } from "./SignUpScreen.jsx";
import { VerifyEmailScreen } from "./VerifyEmailScreen.jsx";
import { VerifyConfirmScreen } from "./VerifyConfirmScreen.jsx";
import { VerifiedScreen } from "./VerifiedScreen.jsx";
import { SecurityCheckScreen } from "./SecurityCheckScreen.jsx";
import { EmailOtpScreen, SmsOtpScreen } from "./TroubleOtpScreens.jsx";

export const authRoutes = {
  // Login (email + Google converge on 2FA)
  "auth/login": LoginScreen,
  "auth/password": PasswordScreen,
  "auth/2fa": TwoFaScreen,
  // Sign up + email verification
  "auth/signup": SignUpScreen,
  "auth/verify-email": VerifyEmailScreen,
  "auth/verify-confirm": VerifyConfirmScreen,
  "auth/verified": VerifiedScreen,
  // Trouble with authenticator (email + SMS OTP fallback)
  "auth/security-check": SecurityCheckScreen,
  "auth/email-otp": EmailOtpScreen,
  "auth/sms-otp": SmsOtpScreen
};
