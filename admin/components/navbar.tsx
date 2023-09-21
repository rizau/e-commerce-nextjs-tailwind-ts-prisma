import { UserButton } from "@clerk/nextjs"

import { MainNav } from "./main-nav"

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="switcher"></div>
        <MainNav className="space-x-4" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
