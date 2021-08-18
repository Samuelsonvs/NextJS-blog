import { Fragment, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["Home", "/"],
  ["Blog", "/blog"],
];
const profile = ["Your Profile", "Settings", "Sign out"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ cb, mounted, resolvedTheme }) {
  const [session, loading] = useSession();
  const [bool, setBool] = useState(false);

  const handleNavButton = () => {
    setBool(!bool);
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-4 md:px-2 lg:px-15">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item[0]}>
                          <Link href={item[1]}>
                            <a
                              onClick={handleNavButton}
                              className="button-mode px-3 py-2 rounded-md text-sm font-medium transition duration-100 ease-in-out"
                            >
                              {item[0]}
                            </a>
                          </Link>
                        </Fragment>
                      ) : (
                        <a
                          onClick={handleNavButton}
                          key={item[0]}
                          href={item[1]}
                          className="button-mode px-3 py-2 rounded-md text-sm font-medium transition duration-100 ease-in-out"
                        >
                          {item[0]}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex mr-2">
                  {/* Theme Provider  */}
                  <div className="mr-2">
                    <button
                      aria-label="Toggle Dark Mode"
                      type="button"
                      className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800"
                      onClick={() =>
                        cb(resolvedTheme === "dark" ? "light" : "dark")
                      }
                    >
                      {mounted && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-800 dark:text-gray-200"
                        >
                          {resolvedTheme === "dark" ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          )}
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Theme Provider Finish */}
                  {!session && !loading &&  (
                    <button
                      className="button-mode button-active-effect font-semibold focus:outline-none px-2 py-1 rounded-md"
                      onClick={() => signIn()}
                    >
                      Sign in
                    </button>
                  )}
                  {session && (
                    <div className="hidden md:block">
                      <div className="ml-3 flex items-center md:ml-3">
                        <button className="bg-gray-800 hidden p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <Image
                                    className="rounded-full"
                                    width={40}
                                    height={40}
                                    src={session.user.image}
                                    alt=""
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  {profile.map((item) => (
                                    <Menu.Item key={item}>
                                      {({ active }) =>
                                        item === "Sign out" ? (
                                          <a
                                            onClick={() => signOut()}
                                            href="#"
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {item}
                                          </a>
                                        ) : (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {item}
                                          </a>
                                        )
                                      }
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="button-mode inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item[0]}>
                    <Link href={item[1]}>
                      <a className="button-mode block px-3 py-2 rounded-md text-base font-medium transition duration-100 ease-in-out">
                        {item[0]}
                      </a>
                    </Link>
                  </Fragment>
                ) : (
                  <a
                    key={item[0]}
                    href={item[1]}
                    className="button-mode block px-3 py-2 rounded-md text-base font-medium transition duration-100 ease-in-out"
                  >
                    {item[0]}
                  </a>
                )
              )}
            </div>
            {session && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="rounded-full"
                      width={40}
                      height={40}
                      src={session.user.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-600 dark:text-gray-200">
                      {session.user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {session.user.email}
                    </div>
                  </div>
                  <button className="ml-auto hidden bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) =>
                    item === "Sign out" ? (
                      <a
                        key={item}
                        onClick={() => signOut()}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item}
                      </a>
                    ) : (
                      <a
                        key={item}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
