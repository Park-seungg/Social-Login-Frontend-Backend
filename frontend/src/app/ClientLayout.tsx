"use client"

import { useAuthContext } from "@/global/auth/hooks/useAuth"

import Link from "next/link"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authState = useAuthContext()
  const { loginMember, isLogin, logout } = authState

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const frontedBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
  const redirectUrl = encodeURIComponent(`${frontedBaseUrl}/members/me`)

  const kakaoLoginUrl = `${apiBaseUrl}/oauth2/authorization/kakao?redirectUrl=${redirectUrl}`
  const googleLoginUrl = `${apiBaseUrl}/oauth2/authorization/google?redirectUrl=${redirectUrl}`

  return (
    <>
      <header>
        <nav className="flex">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            홈
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글목록
          </Link>
          {isLogin ? (
            <>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-gray-100"
              >
                로그아웃
              </button>
              <Link
                href="/members/me"
                className="p-2 rounded hover:bg-gray-100"
              >
                {loginMember.nickname}님의 정보
              </Link>
            </>
          ) : (
            <Link
              href="/members/login"
              className="p-2 rounded hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
          <a href={kakaoLoginUrl} className="p-2 rounded hover:bg-gray-100">
            카카오 로그인
          </a>
          <a href={googleLoginUrl} className="p-2 rounded hover:bg-gray-100">
            구글 로그인
          </a>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">풋터</footer>
    </>
  )
}
