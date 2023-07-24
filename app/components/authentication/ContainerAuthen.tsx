"use client";

import { Button, Input } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const LOGIN_SOCIAL: { name: string; label: string; Icon: IconType }[] = [
  { name: "google", label: "Đăng nhập bằng Gooogle", Icon: FcGoogle },
  { name: "github", label: "Đăng nhập bằng Github", Icon: BsGithub },
];

export default function ContainerAuthen() {
  const params = usePathname();
  const isLoginPage = params === "/login";

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
              className="flex gap-3 font-normal normal-case text-sm border-gray-300 items-center "
              onClick={() => signIn(name)}
            >
              {<Icon size={20} />}
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {label}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex gap-5 justify-between items-center">
          <div className="h-[2px] bg-gray-400 w-full"></div>
          <span>or</span>
          <div className="h-[2px] bg-gray-400 w-full"></div>
        </div>
        <div className="flex flex-col gap-3">
          {!isLoginPage && (
            <>
              <Input type="text" label="Họ và tên" />
              <Input type="number" label="Số điện thoại" />
            </>
          )}
          <Input type="Email" label="Email" />
          <Input type="password" label="Mật khẩu" />
        </div>
        <Button>{isLoginPage ? "Đăng nhập" : "Đăng ký"}</Button>
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
