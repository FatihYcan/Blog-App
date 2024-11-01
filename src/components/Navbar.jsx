import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import logo from "../img/logo.jpg";
import blog from "../img/blog-app.png";

const navigation = [
  { name: "DASHBORD", to: "/", current: false },
  { name: "NEW BLOG", to: "new-blog", current: false },
  { name: "ABOUT", to: "about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, image } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 fixed w-full z-20 top-0">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NavDropdown.Item
                  className="md:text-2xl font-semibold cursor-pointer"
                  href="/"
                >
                  <img className="h-12 w-auto" src={blog} alt={logo} />
                </NavDropdown.Item>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {user && <h5 className="mr-2 text-white capitalize">{user}</h5>}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt={user ? user : avatar}
                        src={image ? image : avatar}
                        className="h-8 w-8 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!user && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      {user && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/my-blogs"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                My Blogs
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={logout}
                              >
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </Disclosure.Button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  alt={user ? user : avatar}
                  src={image ? image : avatar}
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none">
                  {user && (
                    <h5 className="mr-2 text-white capitalize">{user}</h5>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium focus:outline-none">
                {!user ? (
                  <>
                    <Link to="/register" className="block text-md text-white">
                      Register
                    </Link>
                    <Link to="/login" className="block text-md mt-3 text-white">
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/my-blogs" className="block text-md text-white">
                      My Blogs
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-md mt-3 text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      className="block text-md text-white mt-3"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </Disclosure.Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
      <div className="h-[100px]"></div>
    </>
  );
}
