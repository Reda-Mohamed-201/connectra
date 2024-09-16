import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutaions";
import { INavLink } from "@/types";
import { link } from "fs";
import { it } from "node:test";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

function LeftSidebar() {
  const {
    mutateAsync: signOut,
    isPending: isSigningOut,
    isSuccess,
  } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isSuccess) {
      // redirect to login page
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" width={190} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6 ">
          {sidebarLinks.map((item: INavLink) => {
            const isActive = pathname === item.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500 "
                }`}
                key={item.label}
              >
                <NavLink
                  to={item.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={item.imgURL}
                    alt="icon"
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {!isSigningOut ? (
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => signOut()}
        >
          <img src="/assets/icons/logout.svg" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      ) : (
        <Spinner />
      )}
    </nav>
  );
}

export default LeftSidebar;
