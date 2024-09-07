export const init_state = {
  isValid: {
    title: true,
    date: true,
    tag: true,
    note: true,
  },
  isFormReadyToSubmit: false,
  values: {
    title: "",
    date: "",
    tag: "",
    note: "",
  },
};

export default function reducer(state, action) {
  switch (action.type) {
    case "RESET_VALIDITY": {
      return {
        ...state,
        isValid: init_state.isValid,
      };
    }
    case "SUBMIT": {
      const isTitleValid = state.values.title?.trim().length;
      const isTagValid = state.values.tag?.trim().length;
      const isNoteValid = state.values.note?.trim().length;
      const isDateValid = state.values.date;
      return {
        ...state,
        isValid: {
          title: isTitleValid,
          date: isDateValid,
          note: isNoteValid,
          tag: isTagValid,
        },
        isFormReadyToSubmit:
          isTagValid && isDateValid && isNoteValid && isTitleValid,
      };
    }
    case "CLEAR": {
      return {
        ...state,
        values: init_state.values,
        isFormReadyToSubmit: false,
      };
    }
    case "SET_VALUE": {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    }
  }
}
