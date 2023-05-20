import { useReducer, useEffect, createContext } from "react";
import {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../api/questions";

const QuestionsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        error: null,
      };
    case "ADD_QUESTION":
      return {
        ...state,
        questions: [...state.questions, action.payload],
        error: null,
      };
    case "UPDATE_QUESTION":
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload : question
        ),
        error: null,
      };
    case "DELETE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload
        ),
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const QuestionsProvider = ({ children }) => {
  const initialState = {
    questions: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = async (dispatch) => {
    try {
      const items = await getQuestions({ _sort: "id", _order: "desc" });
      dispatch({ type: "FETCH_QUESTIONS", payload: items });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const getQuestionByIdFromApi = async (dispatch, questionId) => {
    try {
      const item = getQuestionById(questionId);
      return item;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const addQuestionToApi = async (dispatch, item) => {
    try {
      const addedItem = await addQuestion(item);
      dispatch({ type: "ADD_QUESTION", payload: addedItem });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateQuestionInApi = async (dispatch, itemId, item) => {
    try {
      const updatedItem = await updateQuestion(itemId, item);
      dispatch({ type: "UPDATE_QUESTION", payload: updatedItem });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const deleteQuestionFromApi = async (dispatch, itemId) => {
    try {
      await deleteQuestion(itemId);
      dispatch({ type: "DELETE_QUESTION", payload: itemId });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchQuestions(dispatch);
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
        getQuestionByIdFromApi,
        addQuestionToApi,
        updateQuestionInApi,
        deleteQuestionFromApi,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
export { QuestionsProvider };
