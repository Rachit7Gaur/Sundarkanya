import { useContext, useEffect, useState } from "react";

import "./Navbar.css";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenu from "./MobileMenu";
import TopAnnouncement from "./TopAnnouncement";
import TopUtilityBar from "./TopUtilityBar";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const { cartCount } = useContext(CartContext);

    const { wishlist } = useContext(WishlistContext);

    const wishlistCount = wishlist.length;

    const [mobileMenu, setMobileMenu] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 50);

        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <>

            <TopAnnouncement scrolled={scrolled} />

            <TopUtilityBar scrolled={scrolled} />

            <DesktopNavbar
                scrolled={scrolled}
                user={user}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
            />

            <MobileNavbar
                scrolled={scrolled}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
            />

            {mobileMenu && (

                <MobileMenu
                    isOpen={mobileMenu}
                    isLoggedIn={!!user}
                    user={user}
                    cartCount={cartCount}
                    wishlistCount={wishlistCount}
                    logout={logout}
                    closeMenu={() => setMobileMenu(false)}
                />

            )}

        </>

    );

}

export default Navbar;