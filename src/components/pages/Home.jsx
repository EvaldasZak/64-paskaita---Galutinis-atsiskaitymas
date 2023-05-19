import React, { useContext } from 'react';
import QuestionsContext from '../../context/QuestionsContext';
import { Link } from 'react-router-dom';
import EditedTag from '../atoms/EditedTag';

const Home = () => {
  const { questions } = useContext(QuestionsContext);

  return (
    <>
      <main>
        <section>
          <h2>Latest Questions</h2>
          {questions && questions.map((question) => (
            <div key={question.id}>
              <Link to={`/question/${question.id}`} >
                <h3>{question.title}</h3>
              </Link>
              <p>{question.body}</p>
              <EditedTag edited={question.edited} />
            </div>
          ))}

        </section>
      </main>

    </>
  )
}

export default Home;