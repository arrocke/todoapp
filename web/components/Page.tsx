import "../styles/index.css";
import "../styles/icons";

const Page: React.FC = ({ children }) => {
  return (
    <div className="w-screen h-screen relative flex flex-col sm:flex-row">
      {children}
    </div>
  );
};

export default Page;
