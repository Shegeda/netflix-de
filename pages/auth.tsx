import Input from "@/components/input";
import AudioPlayer from "@/components/AudioPlayer";
import React, { useCallback, useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const createAnAccount = useCallback(async() => {
    // Функція для реєстрації нового користувача через AJAX (axios)
    try {
      await axios.post('/api/register', {
        email,
        password
      })
      // Тут можна додати логіку після успішної реєстрації (наприклад, редірект або повідомлення)
    } catch (error) {
      // Виводимо помилку у консоль для дебагу
      console.log(error);
    } 
  }, [email, password]);

  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-top bg-cover">
      <div className="absolute inset-0 z-10 bg-overlay-gradient" />
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 lg:px-37 py-6 max-w-[1600px] mx-auto flex justify-between items-center">
        <img src="/images/logo.png" alt="Logo" className="h-10" />
      </nav>
      <main className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <AudioPlayer />
        <div className="w-full max-w-md bg-black/55 rounded-md p-15 text-white shadow-lg">
          <h1 className="text-3xl font-semibold mb-6">
            {variant === "login" ? "Sign In" : "Create an account"}
          </h1>

          <form className="space-y-3">
            <label className="block">
              <Input
                label="Email or mobile number"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
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
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </label>

            <button
              // Кнопка реєстрації. ВАЖЛИВО: тип 'button', щоб не сабмітила форму стандартно
              onClick={createAnAccount}
              type="button"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md mt-2 font-medium"
            >
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>

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
                  {variant === "login" ? "New to Netflix?" : "Already have an account?"}
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
