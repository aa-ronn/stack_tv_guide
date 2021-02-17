import "./button-loader.styles.scss";
import { Spinner } from "../spinner/spinner.component";
import { FC, MouseEventHandler } from "react";
interface IButtonLoader {
  isLoading: boolean;
  loadingText: string;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
}

export const ButtonLoader: FC<IButtonLoader> = ({
  isLoading,
  loadingText,
  text,
  type,
  onClick,
  ...otherProps
}: IButtonLoader) => {
  return (
    <div className={`button-wrapper ${isLoading ? "highlight" : ""}`}>
      <button
        type={type}
        onClick={onClick}
        className={`${otherProps.Google ? "signin-google" : ""}`}
      >
        <div className="test">
          <Spinner isLoading={isLoading} />
        </div>
        {isLoading ? loadingText : text}
      </button>
    </div>
  );
};
