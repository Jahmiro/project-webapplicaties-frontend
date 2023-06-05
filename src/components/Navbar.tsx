import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("fakeToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fakeToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-8xl justify-between p-6 lg:px-10"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"}>
            <p>Logo</p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            className={`text-sm mr-4 font-semibold leading-6 ${
              location.pathname === "/" ? "text-red-600" : "text-gray-900"
            } hover:text-red-600`}
            to={"/"}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                className={`text-sm mr-4 font-semibold leading-6 ${
                  location.pathname === "/windspeed"
                    ? "text-red-600"
                    : "text-gray-900"
                } hover:text-red-600`}
                to={"/windspeed"}
              >
                Wind Speed
              </Link>
              <Link
                className={`text-sm mr-4 font-semibold leading-6 ${
                  location.pathname === "/airpressure"
                    ? "text-red-600"
                    : "text-gray-900"
                } hover:text-red-600`}
                to={"/airpressure"}
              >
                Air Pressure
              </Link>

              <button
                className={`text-sm font-semibold leading-6 text-gray-900 hover:text-red-600`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className={`text-sm font-semibold leading-6 ${
                location.pathname === "/login"
                  ? "text-red-600"
                  : "text-gray-900"
              } hover:text-red-600`}
              to={"/login"}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 p-1.5" to={""}>
              <p className="sm:hidden">Logo</p>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    location.pathname === "/" ? "text-red-600" : "text-gray-900"
                  } hover:text-red-600`}
                  to={"/"}
                >
                  Home
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        location.pathname === "/windspeed"
                          ? "text-red-600"
                          : "text-gray-900"
                      } hover:text-red-600`}
                      to={"/windspeed"}
                    >
                      windspeed
                    </Link>
                    <Link
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        location.pathname === "/airpressure"
                          ? "text-red-600"
                          : "text-gray-900"
                      } hover:text-red-600`}
                      to={"/airpressure"}
                    >
                      Air Pressure
                    </Link>
                    <button
                      className={`text-sm font-semibold leading-6 text-gray-900 hover:text-red-600`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      location.pathname === "/login"
                        ? "text-red-600"
                        : "text-gray-900"
                    } hover:text-red-600`}
                    to={"/login"}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
