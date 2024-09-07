function JournalItem({ title, date, text }) {
  const dateDisplay = date
    ? new Intl.DateTimeFormat("ru-RU").format(new Date(date))
    : "Invalid Date";
  return (
    <>
      <div className="text-neutral-content rounded">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{title}</h2>
          <div className="flex justify-start gap-2">
            <p className="text-sm text-gray">{dateDisplay}</p>
            <p className="text-sm">{text?.slice(0, 68)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default JournalItem;
