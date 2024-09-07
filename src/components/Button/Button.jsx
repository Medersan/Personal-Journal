function Button({ text, onClick, className,...props }) {
  return (
    <>
      <button
      {...props}
        className={
          className
            ? `btn btn-primary ${className}`
            : "btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        }
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
