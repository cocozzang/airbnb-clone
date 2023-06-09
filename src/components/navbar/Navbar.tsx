import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import { SafeUser } from '@/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed z-10 w-full select-none bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
