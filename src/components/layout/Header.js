'use client';
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/AppContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap ">
          Olá, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2 hover:bg-primary-dark "
        >
          Sair
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={"/login"} className="hover:text-gray-800 ">Login</Link>
        <Link href={"/register"} className="bg-primary rounded-full text-white px-8 py-2 hover:bg-primary-dark">
          Registrar-se
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  console.log(status);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch('/api/categories');
    const categories = await res.json();
    setCategories(categories);
  }

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          ST FOME
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button className="p-1 border" onClick={() => setMobileNavOpen((prev) => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div onClick={() => setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={"/"} className="hover:text-gray-800 ">Home</Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="hover:text-gray-800">Menu</button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 p-4">
                {categories.map(category => (
                  <div key={category._id}>
                    <button className="block px-4 py-2 hover:bg-gray-200" onClick={() => handleCategoryClick(category)}>
                      {category.name}
                    </button>
                    {selectedCategory?._id === category._id && (
                      <div className="pl-4">
                        {category.subcategories.map(subcategory => (
                          <Link key={subcategory._id} href={`/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`} className="block px-4 py-2 hover:bg-gray-200">
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href={"/#about"} className="hover:text-gray-800 ">Sobre</Link>
          <Link href={"/#contact"} className="hover:text-gray-800 ">Contato</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            ST FOME
          </Link>
          <Link href={"/"} className="hover:text-gray-800 ">Home</Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="hover:text-gray-800">Menu</button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4">
                {categories.map(category => (
                  <div  key={category._id}>
                    <button className="block px-4 py-2 mt-2 hover:bg-gray-200" onClick={() => handleCategoryClick(category)}>
                      {category.name}
                    </button>
                    {selectedCategory?._id === category._id && (
                      <div className="pl-4">
                        {category.subcategories.map(subcategory => (
                          <Link key={subcategory._id} href={`/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`} className="block px-4 py-2 hover:bg-gray-200">
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href={"/#about"} className="hover:text-gray-800 ">Sobre</Link>
          <Link href={"/#contact"} className="hover:text-gray-800 ">Contato</Link>
        </nav>
        <div className="flex items-center gap-8">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
