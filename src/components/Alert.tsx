import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  onCloseClick: () => void;
}

const Alert = ({ children, onCloseClick }: AlertProps) => {
  return (
    <div className="alert alert-warning alert-dismissible">
      {children}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onCloseClick}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
