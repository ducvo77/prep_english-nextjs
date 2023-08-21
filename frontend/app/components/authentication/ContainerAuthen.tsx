"use client";

import { Button, Input } from "@material-tailwind/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import register from "@/app/lib/auth/register";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const LOGIN_SOCIAL: { name: string; label: string; Icon: IconType }[] = [
  { name: "google", label: "Đăng nhập bằng Gooogle", Icon: FcGoogle },
  { name: "github", label: "Đăng nhập bằng Github", Icon: BsGithub },
];

export default function ContainerAuthen() {
  const [username, setUserName] = useState("");
  const [email, setEmaill] = useState("");
  const [password, setPassword] = useState("");
  const [isFailure, setIsFailure] = useState(false);
  const pathname = usePathname();
  const isLoginPage = useMemo(() => pathname === "/login", [pathname]);
  const { data: session } = useSession();

  const router = useRouter();

  const handleRegister = async () => {
    if (username === "" || email === "" || password === "") {
      return setIsFailure(true);
    }

    const res = await register(username, email, password);
    if (res.status === 200) {
      return router.push("/login");
    } else {
      setIsFailure(true);
    }
  };
  useEffect(() => {
    if (session && (pathname === "/login" || pathname === "/register")) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex justify-center items-center h-[90vh">
      <div className="my-10 p-10 border shadow-2xl rounded-lg flex flex-col gap-6 md:min-w-[450px] min-w-[300px]">
        <h1 className="md:text-2xl text-lg font-semibold text-center uppercase">
          {isLoginPage ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}
        </h1>
        <div className="flex flex-col gap-3">
          {LOGIN_SOCIAL.map(({ label, Icon, name }) => (
            <Button
              key={label}
              variant="outlined"
              className="flex gap-3 normal-case text-sm border-gray-300 items-center text-black font-medium"
              onClick={() => {
                signIn(name);
              }}
            >
              {<Icon size={24} />}
              <div className="w-[1px] h-6 bg-gray-300"></div>
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {label}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex gap-5 justify-between items-center">
          <div className="h-[2px] bg-gray-400 w-full"></div>
          <span>Hoặc</span>
          <div className="h-[2px] bg-gray-400 w-full"></div>
        </div>
        <div className="flex flex-col gap-3">
          {!isLoginPage && (
            <>
              <Input
                type="text"
                label="Tên tài khoản"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </>
          )}
          <Input
            type="Email"
            label="Email"
            value={email}
            onChange={(e) => setEmaill(e.target.value)}
          />
          <Input
            type="password"
            label="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          onClick={
            isLoginPage
              ? () =>
                  signIn("credentials", {
                    email,
                    password,
                  })
              : handleRegister
          }
        >
          {isLoginPage ? "Đăng nhập" : "Đăng ký"}
        </Button>
        {isFailure && (
          <span className="text-sm text-red-400 text-center italic">
            {isLoginPage ? "Đăng nhập thất bại" : "Đăng ký thất bại"}
          </span>
        )}
        <div className="text-sm flex gap-1">
          <span className="text-gray-500">
            {isLoginPage ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          </span>
          <Link
            href={`${isLoginPage ? "/register" : "/login"}`}
            className="second-color"
          >
            {isLoginPage ? "Đăng ký" : "Đăng nhập"}
          </Link>
        </div>
      </div>
    </div>
  );
}
