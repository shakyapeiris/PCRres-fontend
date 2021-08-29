import React, { ReactElement, useContext } from "react";
import Link from "next/link";

import classes from "../styles/Layout.module.css";
import { AuthContext } from "../Store/AuthContext";
//In every proifle visiit users location will be accessed
//With that we can track the nearest patient
//Booking feature will be optional

const Layout = (props: { children: ReactElement }) => {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <header className={classes.Container}>
        <Link href="/">
          <h1 className={classes.Brand}>PCRres.Lk</h1>
        </Link>

        <nav>
          <ul>
            {ctx.loginId && !ctx.isAdmin && (
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            )}
            {!ctx.isAdmin && (
              <>
                <li>
                  <Link href="/analytics">Past Analytics</Link>
                </li>
              </>
            )}
            {ctx.loginId && !ctx.isAdmin && (
              <li>
                <Link href="/book">Book</Link>
              </li>
            )}
            {ctx.loginId === null && (
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
            )}
            {ctx.loginId && <li style={{cursor: "pointer"}} onClick={() => {ctx.logout()}}>Logout</li>}
          </ul>
        </nav>
      </header>
      <div className={classes.Body}>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
