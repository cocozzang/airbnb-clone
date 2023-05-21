'use client'

import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser?: User | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
            <div className="flex cursor-pointer flex-col">
              {currentUser ? (
                <>
                  <MenuItem label="My trips" onClick={() => {}} />
                  <MenuItem label="My favorites" onClick={() => {}} />
                  <MenuItem label="My reservations" onClick={() => {}} />
                  <MenuItem label="My properties" onClick={() => {}} />
                  <MenuItem label="Airbnb my home" onClick={() => {}} />
                  <hr />
                  <MenuItem label="Logout" onClick={signOut} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={loginModal.onOpen} />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
