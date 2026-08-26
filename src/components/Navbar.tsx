'use client'

import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'

function Navbar() {
    const { data: session } = useSession()
    const user: User = session?.user as User
    return (
        <nav className="sticky top-0 z-40 bg-white text-[#121212] border-b-4 border-black px-4 py-3 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-2xl font-black tracking-tighter uppercase text-[#121212] hover:opacity-90 transition-opacity"
                >
                    <span className="flex items-center gap-1" aria-hidden="true">
                        <span className="inline-block size-3.5 rounded-full bg-[#D02020] border border-black" />
                        <span className="inline-block size-3.5 rounded-none bg-[#1040C0] border border-black" />
                        <span className="inline-block size-3.5 rounded-none bg-[#F0C020] border border-black rotate-45" />
                    </span>
                    <span>Blurt</span>
                </Link>

                {session ? (
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#F0F0F0] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#121212]">
                            {user?.username ? user.username : 'User'} <span className="text-[#808080]">|</span> {user?.email}
                        </span>

                        <Button
                            className="w-full sm:w-auto"
                            variant="default"
                            size="sm"
                            onClick={() => signOut({
                                redirect: true,
                                callbackUrl: "/",
                            })}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                        <Link href="/sign-in" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto" variant="outline" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href="/sign-up" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto" variant="yellow" size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
