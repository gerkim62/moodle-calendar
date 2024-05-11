"use client";
import { ComponentProps, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

type CustomLinkProps = ComponentProps<typeof Link>;

const CustomLink: React.FC<CustomLinkProps> = ({ children, href, ...rest }) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(`pathname changed so hiding the loader: ${pathname}`);
    NProgress.done();
  }, [pathname]);

  const handleClick = () => {
    // this is not comprehensive but it's a good start, you can add more conditions if needed
    const wontNavigate =
      pathname === href ||
      href.toString().startsWith("#") ||
      rest.target === "_blank";

    NProgress.start();
    if (wontNavigate) {
      console.log(`wontNavigate is true so hiding the loader: ${href}`);

      return NProgress.done();
    }
  };

  return (
    <>
      <Link {...rest} href={href} onClick={handleClick}>
        {children}
      </Link>
    </>
  );
};

export default CustomLink;
