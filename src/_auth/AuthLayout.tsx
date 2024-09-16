import { Navigate, Outlet } from "react-router-dom";
const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Navigate to="/" />
        </div>
      ) : (
        <>
          <section className="flex flex-1 flex-col items-center justify-center">
            <Outlet />
          </section>
          <img
            src="/assets/images/newside1.jpg"
            alt="logo"
            
            className="hidden lg:block object-cover w-1/2 bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
