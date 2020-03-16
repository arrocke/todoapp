import "../styles/index.css";
import "../styles/icons";
import UITextInput from "../components/UITextInput";
import UILabel from "../components/UILabel";
import UIButton from "../components/UIButton";

const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={() => {}}>
        <div>
          <UILabel htmlFor="email" className="w-24 text-right mr-2">
            Email
          </UILabel>
          <UITextInput type="email" id="email" className="w-64" />
        </div>
        <div>
          <UILabel htmlFor="password" className="w-24 text-right mr-2">
            Password
          </UILabel>
          <UITextInput type="password" id="password" className="w-64" />
        </div>
        <div>
          <UIButton type="submit">Log In</UIButton>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
