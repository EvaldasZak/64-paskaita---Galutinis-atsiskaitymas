import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Vote from "./Vote";
import EditedTag from "../atoms/EditedTag";
import Avatar from "../atoms/Avatar";

const VoteComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const QuestionStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserBlock = styled.div`
  padding-left: 20px;
  flex: 0.2;
`;

const Flex = styled.div`
  flex: 1;
`;

const Username = styled.p`
  text-align: center;
`;

const Question = ({ question, users }) => {
  const user = users.find((user) => user.id === question.userId);

  return (
    <div>
      <hr />
      <QuestionStyle>
        <VoteComponent>
          <Vote
            type="question"
            rating={question.rating}
            id={question.id}
            object={question}
          />
        </VoteComponent>
        <Flex>
          <Link to={`/question/${question.id}`}>
            <h3>{question.title}</h3>
          </Link>
          <p>{question.body}</p>
          <EditedTag edited={question.edited} />
        </Flex>
        <UserBlock>
          <Username>{user.name}</Username>
          <Avatar user={user} size={30} />
        </UserBlock>
      </QuestionStyle>
    </div>
  );
};

export default Question;
