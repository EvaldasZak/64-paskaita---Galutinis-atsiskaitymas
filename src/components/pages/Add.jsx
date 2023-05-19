import React, { useContext } from 'react';
import QuestionsContext from '../../context/QuestionsContext';

const Add = () => {
  const { questions } = useContext(QuestionsContext);

  return (
    <>
      <main>
        <section>
          <h2>Add</h2>
        </section>
      </main>

    </>
  )
}

export default Add;