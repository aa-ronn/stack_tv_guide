import "./spinner.styles.scss";

interface ISpinner {
  isLoading: boolean;
}

export const Spinner = ({ isLoading }: ISpinner) => {
  // return isLoading ? <span className="loader" /> : null;
  return isLoading ? (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  ) : null;
};
