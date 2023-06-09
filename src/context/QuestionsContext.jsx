import { useReducer, useEffect, createContext } from "react";
import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../api/questions";

import {
  addAnswer,
  deleteAnswer,
  getAnswers,
  updateAnswer,
} from "../api/answers";

const QuestionsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "UPVOTE_QUESTION":
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload
            ? { ...question, rating: question.rating + 1 }
            : question
        ),
        error: null,
      };
    case "DOWNVOTE_QUESTION":
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload
            ? { ...question, rating: question.rating - 1 }
            : question
        ),
        error: null,
      };
    case "UPVOTE_ANSWER":
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer.id === action.payload
            ? { ...answer, rating: answer.rating + 1 }
            : answer
        ),
        error: null,
      };
    case "DOWNVOTE_ANSWER":
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer.id === action.payload
            ? { ...answer, rating: answer.rating - 1 }
            : answer
        ),
        error: null,
      };

    case "FETCH_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        error: null,
      };
    case "FETCH_ANSWERS":
      return {
        ...state,
        answers: action.payload,
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
    case "ADD_ANSWER":
      return {
        ...state,
        answers: [...state.answers, action.payload],
        error: null,
      };
    case "UPDATE_ANSWER":
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer.id === action.payload.id ? action.payload : answer
        ),
        error: null,
      };
    case "DELETE_ANSWER":
      return {
        ...state,
        answers: state.answers.filter((answer) => answer.id !== action.payload),
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
    questions: [],
    answers: [],
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = async (dispatch) => {
    try {
      const items = await getQuestions();
      dispatch({ type: "FETCH_QUESTIONS", payload: items });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchAnswers = async (dispatch) => {
    try {
      const items = await getAnswers();
      dispatch({ type: "FETCH_ANSWERS", payload: items });
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

  const addAnswerToApi = async (dispatch, answer) => {
    try {
      const addedAnswer = await addAnswer(answer);
      dispatch({ type: "ADD_ANSWER", payload: addedAnswer });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateAnswerInApi = async (dispatch, itemId, item) => {
    try {
      const updatedItem = await updateAnswer(itemId, item);
      dispatch({ type: "UPDATE_ANSWER", payload: updatedItem });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const deleteAnswerFromApi = async (dispatch, itemId) => {
    try {
      await deleteAnswer(itemId);
      dispatch({ type: "DELETE_ANSWER", payload: itemId });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const upvoteQuestion = (dispatch, id, question) => {
    dispatch({ type: "UPVOTE_QUESTION", payload: id });
    updateQuestion(id, question);
  };

  const downvoteQuestion = (dispatch, id, question) => {
    dispatch({ type: "DOWNVOTE_QUESTION", payload: id });
    updateQuestion(id, question);
  };

  const upvoteAnswer = (dispatch, id, answer) => {
    dispatch({ type: "UPVOTE_ANSWER", payload: id });
    updateAnswer(id, answer);
  };

  const downvoteAnswer = (dispatch, id, answer) => {
    dispatch({ type: "DOWNVOTE_ANSWER", payload: id });
    updateAnswer(id, answer);
  };

  useEffect(() => {
    fetchAnswers(dispatch);
    fetchQuestions(dispatch);
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
        addQuestionToApi,
        updateQuestionInApi,
        deleteQuestionFromApi,
        addAnswerToApi,
        updateAnswerInApi,
        deleteAnswerFromApi,
        upvoteQuestion,
        downvoteQuestion,
        upvoteAnswer,
        downvoteAnswer,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
export { QuestionsProvider };
