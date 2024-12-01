import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LogoImage from "../assets/logo.svg";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between items-center w-full">
        <div className="flex gap-3 justify-center items-center">
          <Link to="/" className="p-0">
            <img src={LogoImage} className="h-8 w-8" />
          </Link>
          <Link to="/about" className="[&.active]:font-bold text-sm">
            About
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold text-sm">
            Dashboard
          </Link>
        </div>
        <div className="flex gap-2 justify-center items-center text-sm">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="[&.active]:font-bold text-sm">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
