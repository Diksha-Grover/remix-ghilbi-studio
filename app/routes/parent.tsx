import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import styles from "../../app/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Parent() {
  return (
    <div className="p-20">
      <Outlet />
    </div>
  );
}
