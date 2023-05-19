import React, { useContext } from 'react';
import QuestionsContext from '../../context/QuestionsContext';

const Home = () => {
  const { questions } = useContext(QuestionsContext);

  return (
    <>
      <main>
        <section>
          <h2>Latest Questions</h2>
          {questions && questions.map((question) => (
            <div key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.body}</p>
            </div>
          ))}

        </section>
      </main>

    </>
  )
}

export default Home;