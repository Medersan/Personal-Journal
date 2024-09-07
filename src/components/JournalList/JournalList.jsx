  import { useContext, useMemo } from "react";
  import CardButton from "../CardButton/CardButton";
  import JournalItem from "../JournalItem/JournalItem";
  import { UserContext } from "../context/UserContext";

  function JournalList({items,setItems}) {
    const {userId} = useContext(UserContext)
      const sortItems = (a, b) => {
        return a.date > b.date ? 1 : -1;
      };
      const filteredItems = useMemo(()=>{
        return items.filter((item)=>item.userId === userId).sort(sortItems);
      },[items,userId])
    return (
      <div>
        {items.length > 0 &&
          filteredItems.map((v) => (
            <CardButton key={v.id} onClick={()=>setItems(v)}>
              <JournalItem title={v.title} date={v.date} text={v.note} />
            </CardButton>
          ))}
        {items.length === 0 && <CardButton>No items available</CardButton>}
      </div>
    );
  }

  export default JournalList
