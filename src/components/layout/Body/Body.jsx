import SelectUser from "../../SelectUser/SelectUser";

function Body({ children }) {
  return (
    <div className="p-4 flex flex-col gap-3 w-96">
      <SelectUser />
      {children}
    </div>
  );
}

export default Body;
