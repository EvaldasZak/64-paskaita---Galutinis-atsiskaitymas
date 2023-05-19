import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionsContext from '../../context/QuestionsContext';

import { Vote } from '../organisms/Vote';


const Question = () => {
    const { id } = useParams();
    const { getQuestionById } = useContext(QuestionsContext);
    const [question, setQuestion] = useState(null)

    const fetchQuestion = useCallback(async () => {
        const fetchedQuestion = await getQuestionById(id);
        setQuestion(fetchedQuestion);
    }, [getQuestionById, id]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    if (!question) {
        return <div>Error: Question not found</div>;
    }

    return (
        <main>
            <section id="single-question">
                <div className="question">
                    <Vote />
                    <div className="question-details">
                        <h3>{question?.title}</h3>
                        <p>{question?.body}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Question