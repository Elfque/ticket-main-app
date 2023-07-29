const Alert = ({ alert }) => {
  return (
    <div>
      <div
        className={`${
          alert.type === "good" ? "bg-green-500" : "bg-red-500"
        } p-2 text-white text-sm font-semibold my-1`}
      >
        {alert.text}
      </div>
    </div>
  );
};

export default Alert;
