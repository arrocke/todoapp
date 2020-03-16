import Link from "next/link";
import { useState, ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavigationButtonProps extends ComponentProps<"button"> {
  icon: IconProp;
  title: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  title,
  className,
  ...props
}) => {
  return (
    <button {...props} className={`w-14 h-10 ${className}`}>
      <FontAwesomeIcon icon={icon} />
      <div className="text-2xs text-center font-bold">
        {title.toUpperCase()}
      </div>
    </button>
  );
};

const Navigation: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="order-1 sm:order-none">
      {isOpen && (
        <div className="bg-blue-100 absolute w-full h-full top-0 flex flex-col">
          <nav className="flex-grow"></nav>
          <button className="h-10" onClick={() => setOpen(false)}>
            <FontAwesomeIcon
              icon="times"
              className="align-middle"
              aria-hidden
            />
            <span className="ml-2 text-sm font-bold align-middle">CLOSE</span>
          </button>
        </div>
      )}
      <nav className="flex justify-center bg-blue-200 p-1 sm:flex-col sm:justify-start sm:h-full sm:pt-2">
        <Link href="/account">
          <NavigationButton icon="user" title="Account" />
        </Link>
        <Link href="/focus">
          <NavigationButton icon="microscope" title="Focus" />
        </Link>
        <NavigationButton
          icon="bars"
          title="Menu"
          onClick={() => setOpen(isOpen => !isOpen)}
        />
      </nav>
    </div>
  );
};

export default Navigation;
