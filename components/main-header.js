import Link from "next/link";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader({ children }) {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals" className={classes.link}>
                Browse Meals
              </Link>
            </li>
            <li>
              <Link href="/meals/share" className={classes.link}>
                Share Meal
              </Link>
            </li>
            <li>
              <Link href="/community" className={classes.link}>
                Foodies Community
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
