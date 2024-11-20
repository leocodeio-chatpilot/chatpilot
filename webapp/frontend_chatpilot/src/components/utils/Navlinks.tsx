import { logoutLinks, userSignedInLinks } from "../../constants";
import { userNotSignedInLinks } from "../../constants";
import { navLinks } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../functions/signout";

const Navlinks = ({
  active,
  setActive,
  singedIn,
}: {
  active: string;
  setActive: (title: string) => void;
  singedIn: boolean;
}) => {
  const navigate = useNavigate();
  const handleSignout = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    try {
      await signout();
      console.log("signed out");
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {navLinks.map((nav) => (
        <li
          key={nav.id}
          className={`${
            active === nav.title
              ? "text-white dark:text-secondary"
              : "text-secondary dark:text-black"
          } hover:text-white text-[18px] font-medium cursor-pointer dark:hover:text-gray-700`}
          onClick={() => setActive(nav.title)}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
      {!singedIn ? (
        userNotSignedInLinks.map((nav: any) => (
          <li
            key={nav.id}
            className={`${
              active === nav.title
                ? "text-white dark:text-secondary"
                : "text-secondary dark:text-black"
            } hover:text-white text-[18px] font-medium cursor-pointer dark:hover:text-gray-700 textwrap-nowrap`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))
      ) : (
        <>
          {userSignedInLinks.map((nav: any) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title
                  ? "text-white dark:text-secondary"
                  : "text-secondary dark:text-black"
              } hover:text-white text-[18px] font-medium cursor-pointer dark:hover:text-gray-700 textwrap-nowrap`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
          {logoutLinks.map((nav: any) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title
                  ? "text-white dark:text-secondary"
                  : "text-secondary dark:text-black"
              } hover:text-white text-[18px] font-medium cursor-pointer dark:hover:text-gray-700 textwrap-nowrap`}
              onClick={handleSignout}
            >
              <Link to={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default Navlinks;
