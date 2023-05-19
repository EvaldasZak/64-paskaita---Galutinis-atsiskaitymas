import { useReducer, useEffect, createContext } from "react";

const QuestionsContext = createContext();

const QUESTIONS_ACTION_TYPE = {
  GET: 'get_all_questions',
  ADD: 'add_new_question',
  GET_BY_ID: 'get_question_by_id',
  UPDATE: 'update_question'
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
    case QUESTIONS_ACTION_TYPE.UPDATE:
        return state.map((question) => {
          if (question.id === action.data.id) {
            return {
              ...question,
              title: action.data.title,
              body: action.data.body,
              edited: true,
              user_id: action.data.user_id
            };
          }
          return question;
        });
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

  const editQuestion = (id, editedTitle, editedBody, user_id) => {
    fetch(`http://localhost:8080/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title: editedTitle, body: editedBody, user_id, edited: true }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions({
          type: QUESTIONS_ACTION_TYPE.UPDATE,
          data: updatedQuestion,
        });
      })
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
        getQuestionById,
        editQuestion
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
export { QuestionsProvider };

