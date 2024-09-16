import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutaions";
import Spinner from "./Spinner";
import { useUserContext } from "@/context/AuthContext";

function Topbar() {
  const {
    mutateAsync: signOut,
    isPending: isSigningOut,
    isSuccess,
  } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      // redirect to login page
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            className=" py-[5px] "
            width={168}
            height={360}
          />
        </Link>
        <div className="flex gap-4">
          {!isSigningOut ? (
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={() => signOut()}
            >
              <img src="/assets/icons/logout.svg" />
            </Button>
          ) : (
            <Spinner />
          )}
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Topbar;
