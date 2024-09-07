function CardButton({children,changeInput,...props}) {
  return (
    <>
      <div className="card bg-base-200 w-76 shadow-sm mt-2 cursor-pointer" {...props}>
        <div className="card-body">
          <h2 className="card-title">{children}</h2>
        </div>
      </div>
    </>
  );
}

export default CardButton
