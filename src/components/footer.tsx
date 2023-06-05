import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import somfuel from "../../src/assets/somfuelicon.jpeg";

export const Footer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="mb-6 md:mb-0">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="text-white self-center text-2xl font-semibold whitespace-nowrap">
              Somali Fuel Company
            </span>
          </a>
        </div>
        <hr className="my-6 border-white sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white  sm:text-center ">
            © 2023 Project groep 3 . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
