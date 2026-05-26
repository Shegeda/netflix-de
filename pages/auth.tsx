import Input from "@/components/input";
import AudioPlayer from "@/components/AudioPlayer";
import React, { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [authError, setAuthError] = useState("");

  const toggleVariant = useCallback((ev?: React.MouseEvent<HTMLAnchorElement>) => {
    ev?.preventDefault();
    setAuthError("");
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const switchToLogin = useCallback((ev?: React.MouseEvent<HTMLAnchorElement>) => {
    ev?.preventDefault();
    setAuthError("");
    setVariant("login");
  }, []);

  const login = useCallback(async () => {
    setAuthError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setAuthError("We couldn't sign you in. Please check your email and password.");
        return;
      }

      router.push("/");
    } catch (error) {
      setAuthError("Something went wrong. Please try again.");
      console.log(error);
    }
  }, [email, password, router]);

  const createAnAccount = useCallback(async () => {
    // Функція для реєстрації нового користувача через AJAX (axios)
    setAuthError("");

    try {
      await axios.post("/api/register", {
        email,
        password,
      });

      login();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setAuthError("An account with this email already exists.");
        return;
      }

      setAuthError("We couldn't create your account. Please try again.");
      // Виводимо помилку у консоль для дебагу
      console.log(error);
    }
  }, [email, password, login]);

  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-top bg-cover">
      <div className="absolute inset-0 z-10 bg-overlay-gradient" />
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 lg:px-37 py-6 max-w-[1600px] mx-auto flex justify-between items-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </nav>
      <main className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <AudioPlayer />
        <div className="w-full max-w-md bg-black/55 rounded-md p-15 text-white shadow-lg">
          <h1 className="text-3xl font-semibold mb-6">
            {variant === "login" ? "Sign In" : "Create an account"}
          </h1>

          {authError && (
            <div
              role="alert"
              className="mb-4 rounded bg-[#e87c03] px-4 py-3 text-sm text-white"
            >
              <p>{authError}</p>
              {variant === "register" && (
                <p className="mt-2">
                  Want to continue watching?{" "}
                  <a
                    href="#"
                    onClick={switchToLogin}
                    className="font-semibold underline decoration-white/70 underline-offset-2 hover:decoration-white"
                  >
                    Sign in instead.
                  </a>
                </p>
              )}
            </div>
          )}

          <form className="space-y-3">
            <label className="block">
              <Input
                label="Email or mobile number"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                  setAuthError("");
                  setEmail(ev.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
            </label>

            <label className="block">
              <Input
                label="Password"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                  setAuthError("");
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </label>

            <button
              // Кнопка реєстрації. ВАЖЛИВО: тип 'button', щоб не сабмітила форму стандартно
              onClick={variant === "login" ? login : createAnAccount}
              type="button"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md mt-2 font-medium"
            >
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-4 justify-center">
              <div
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FcGoogle size={30} />
              </div>

              <div
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FaGithub size={30} className="text-black" />
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              <div className="flex justify-center">
                <a
                  className="underline text-gray-300 text-sm transition-colors duration-150 hover:text-gray-400"
                  href="#"
                  style={{ textUnderlineOffset: "3px" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-start">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-[#333] accent-red-600"
                  />
                  Remember me
                </label>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">
                  {variant === "login"
                    ? "New to Netflix?"
                    : "Already have an account?"}
                </span>
                <a
                  onClick={toggleVariant}
                  className="ml-1 text-white font-extrabold text-sm transition-all duration-150 hover:underline"
                  href="#"
                  style={{ textUnderlineOffset: "3px" }}
                >
                  {variant === "login" ? "Sign up now." : "Sign in now."}
                </a>
              </div>
              <div className="mt-5 text-xs text-left text-gray-400">
                This page is protected by Google reCAPTCHA to ensure you are not
                a bot.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
