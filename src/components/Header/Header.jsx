import React, {useState} from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { FaArrowRight } from "react-icons/fa"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const [showMenu, setShowMenu] = useState(false)

  const navItems = [
      {
          name: "Home",
          slug: "/",
          active: true,
      },
      {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "SignUp",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "My Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
  ]

  return (
      <header className="bg-[var(--dark)] py-3 shadow">
          <Container>
              <nav className="flex items-center justify-between">
                  <div>
                      <Link to="/">
                          <Logo className="text-4xl" />
                      </Link>
                  </div>
                  <GiHamburgerMenu
                      className="cursor-pointer text-3xl active:scale-95 md:hidden"
                      onClick={() => {
                          setShowMenu(true)
                      }}
                  />
                  <div
                      className={`fixed right-0 top-0 z-10 rounded-l-xl bg-[var(--dark)] p-8 shadow-2xl transition ${
                          showMenu
                              ? "translate-x-0 opacity-100"
                              : "translate-x-full opacity-0"
                      } `}
                  >
                      <FaArrowRight
                          className="cursor-pointer text-2xl active:scale-95"
                          onClick={() => {
                              setShowMenu(false)
                          }}
                      />
                      <ul className="mt-3 flex flex-col gap-3">
                          {navItems.map((item) => {
                              return item.active ? (
                                  <li
                                      key={item.slug}
                                      className="flex"
                                      onClick={() => {
                                          setShowMenu(false)
                                      }}
                                  >
                                      <NavLink
                                          to={item.slug}
                                          className="w-full rounded-full px-6 py-2 text-xl font-bold text-[var(--light)] transition hover:bg-[var(--light)] hover:text-gray-800"
                                          style={({ isActive }) => {
                                              return {
                                                  backgroundColor: isActive
                                                      ? "var(--light)"
                                                      : null,
                                                  color: isActive
                                                      ? "rgb(31 41 55)"
                                                      : null,
                                              }
                                          }}
                                      >
                                          {item.name}
                                      </NavLink>
                                  </li>
                              ) : null
                          })}
                          {authStatus && (
                              <li className="text-xl font-bold text-gray-800">
                                  <LogoutBtn />
                              </li>
                          )}
                      </ul>
                  </div>

                  <ul className="hidden gap-3 md:flex">
                      {navItems.map((item) => {
                          return item.active ? (
                              <li key={item.slug} className="flex">
                                  <NavLink
                                      to={item.slug}
                                      className="rounded-full px-6 py-2 text-xl font-bold text-[var(--light)] transition hover:bg-[var(--light)] hover:text-gray-800"
                                      style={({ isActive }) => {
                                          return {
                                              backgroundColor: isActive
                                                  ? "var(--light)"
                                                  : null,
                                              color: isActive
                                                  ? "rgb(31 41 55)"
                                                  : null,
                                          }
                                      }}
                                  >
                                      {item.name}
                                  </NavLink>
                              </li>
                          ) : null
                      })}
                      {authStatus && (
                          <li className="text-xl font-bold text-gray-800">
                              <LogoutBtn />
                          </li>
                      )}
                  </ul>
              </nav>
          </Container>
      </header>
  )
}

export default Header