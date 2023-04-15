import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const routes = [
  { path: "/", icon: "home", name: "Home" },
  { path: "/search", icon: "search", name: "Search" },
  { path: "/vault", icon: "shield-alt", name: "Vault" },
  { path: "/notifications", icon: "bell", name: "Notifications" },
  { path: "/messages", icon: "envelope", name: "Messages" },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around bg-white shadow-lg">
      {routes.map(({ path, icon, name }) => (
        <Link key={path} href={path} passHref>
          <div
            role="link"
            aria-label={name}
            tabIndex={0}
            className="text-xl text-gray-500"
          >
            <FontAwesomeIcon icon={`${icon}`} />
          </div>
        </Link>
      ))}
    </div>
  );
}
