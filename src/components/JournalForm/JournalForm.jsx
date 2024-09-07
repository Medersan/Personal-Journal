import { MdOutlineDateRange } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdTitle } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import reducer, { init_state } from "./reducer";
import Input from "../Input/Input";
import { UserContext } from "../context/UserContext";
import { FcDeleteDatabase } from "react-icons/fc";

function JournalForm({ onSubmit, data, onDelete, newMemory }) {
  const [state, dispatch] = useReducer(reducer, init_state);
  const { values, isValid, isFormReadyToSubmit } = state;

  const { userId } = useContext(UserContext);

  const titleRef = useRef();
  const tagRef = useRef();
  const dateRef = useRef();
  const noteRef = useRef();

  const focusError = (isValid) => {
    const refs = [titleRef, tagRef, dateRef, noteRef];
    const validity = [isValid.title, isValid.tag, isValid.note, isValid.date];
    for (let i = 0; i < validity.length; i++) {
      if (!validity[i]) {
        refs[i].current.focus();
      }
    }
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatch({
      type: "CLEAR",
    });
  };

  useEffect(() => {
    if (Object.values(isValid).some((valid) => !valid)) {
      focusError(isValid);
      const timerId = setTimeout(() => {
        dispatch({
          type: "RESET_VALIDITY",
        });
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatch({
        type: "CLEAR",
      });
      dispatch({
        type: "SET_VALUE",
        payload: { userId: userId || 1 },
      });
    }
  }, [isFormReadyToSubmit, userId]);

  useEffect(() => {
    dispatch({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

  useEffect(() => {
    dispatch({
      type: "SET_VALUE",
      payload: { ...data },
    });
  }, [data]);

  const setValues = (e) => {
    dispatch({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };
  const setTitle = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT",
    });
  };

  useEffect(() => {
    dispatch({
      type: "CLEAR",
    });
  }, [newMemory]);

  return (
    <>
      <div className="p-6">
        <form
          className="flex flex-col gap-4 min-w-96 overflow-hidden"
          onSubmit={setTitle}
        >
          <div className="flex items-center gap-3 justify-center relative">
            <MdTitle className="text-3xl" />
            <Input
              placeholder="Enter your journal title"
              type="text"
              name="title"
              className="p-4 rounded w-full"
              ref={titleRef}
              value={values.title}
              onChange={setValues}
              style={!isValid.title ? { background: "red" } : {}}
            />
            {data.id ? (
              <Button
                text={<FcDeleteDatabase />}
                type="button"
                className="absolute right-2 text-white"
                alt="Delete your note"
                onClick={deleteJournalItem}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-3 justify-center">
            <MdOutlineDateRange className="text-3xl" />
            <Input
              type="date"
              name="date"
              ref={dateRef}
              value={
                values.date
                  ? new Date(values.date).toISOString().slice(0, 10)
                  : ""
              }
              onChange={setValues}
              className="rounded w-full p-4"
              style={!isValid.date ? { background: "red" } : {}}
            />
          </div>
          <div className="flex gap-3 items-center flex-row">
            <FaNotesMedical className="text-3xl" />
            <Input
              type="text"
              name="tag"
              ref={tagRef}
              value={values.tag}
              onChange={setValues}
              className="rounded w-full p-4"
              placeholder="Enter your note tag#"
              style={!isValid.tag ? { background: "red" } : {}}
            />
          </div>
          <div className="flex gap-3">
            <BsChatLeftText className="text-3xl mt-1" />
            <textarea
              cols={110}
              rows={10}
              name="note"
              ref={noteRef}
              id=""
              className="w-ful p-4 rounded h-full resize-none"
              value={values.note}
              onChange={setValues}
              placeholder="Enter your memory"
              style={!isValid.note ? { background: "red" } : {}}
            ></textarea>
          </div>
          <Button text="Add new memory" className="text-white ml-10 w-full" />
        </form>
      </div>
    </>
  );
}

export default JournalForm;
