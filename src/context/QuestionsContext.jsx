import { useReducer, useEffect, createContext } from "react";

const QuestionsContext = createContext();

const QUESTIONS_ACTION_TYPE = {
  GET: 'get_all_questions',
  ADD: 'add_new_question',
  GET_BY_ID: 'get_question_by_id'
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUESTIONS_ACTION_TYPE.GET:
      return action.data;
    case QUESTIONS_ACTION_TYPE.ADD:
      fetch(`http://localhost:8080/questions`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(action.data)
      })
      return [...state, action.data];
    case QUESTIONS_ACTION_TYPE.GET_BY_ID:
      return state.find(question => question.id === action.data);
    default:
      return state;
  }
};

const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useReducer(reducer, null);
  const getQuestionById = (questionId) => {
    const question = questions.find(question => question.id === parseInt(questionId));
    return question || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch('http://localhost:8080/questions')
        .then(res => res.json())
        .then(data => {
          setQuestions({
            type: QUESTIONS_ACTION_TYPE.GET,
            data: data
          });
        })
        .catch(error => {
          // Handle the error
        });
    };

    fetchData();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        QUESTIONS_ACTION_TYPE,
        getQuestionById
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
export { QuestionsProvider };

