import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid';
import Pagination from 'antd/lib/pagination';
import Loader from 'react-loader-spinner';
import { getFeedback } from '../../state/actions/feedbackActions';
import FeedbackRating from '../../components/DataVisualization/Rating';
import FeedbackCard, {
  CardContainer,
} from '../../components/Cards/FeedbackCard';
import EmptyFeedback from '../../components/Cards/EmptyFeedbackCard';
import StudentChart from '../../components/DataVisualization/StudentChart';
import devices from '../../utils/devices';

const StyledFeedback = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;

  .feedback-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .feedback-title {
    margin: 0;
    color: #595959;
    font-size: 1.8rem;
    font-weight: 400;
    text-align: center;

    @media ${devices.tablet} {
      margin-top: 2rem;
      text-align: center;
    }
  }

  .feedback-card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media ${devices.tablet} {
      flex-direction: column;
    }

    .feedback-card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 1rem;
    }
    .chart-display {
      width: 80%;
      margin: 0 auto;
      @media ${devices.tablet} {
        display: none;
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2rem;
      margin-top: 3em;
    }

    .ant-pagination-item-active {
      border-color: #4fad65;
    }
    .ant-pagination-item-active a {
      color: #4fad65;
    }

    .loaderStyled {
      margin-top: 20vh;
      margin-left: -17rem;
    }

    .chart-container {
      height: 30em;
      width: 100%;
      padding: 1em;
    }
  }
`;

const ChartCardContainer = styled(CardContainer)`
  height: 25rem;
  max-width: 60em;
  padding: 3em 2em 2em 0.8em;
`;

const Feedback = ({ user, getFeedback, feedback }) => {
  console.log(feedback);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);

  useEffect(() => {
    getFeedback(user.id, user.role_id);
  }, [getFeedback, user]);

  const handlePagination = value => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(6);
    } else {
      setMinValue(value * 6 - 6);
      setMaxValue(value * 6);
    }
  };

  return (
    <StyledFeedback className='feedback-container'>
      <h2 className='feedback-title'>Interview Feedback</h2>
      {feedback.length > 0 && (
        <div className='feedback-content'>
          <ChartCardContainer>
            <StudentChart />
          </ChartCardContainer>
        </div>
      )}
      {feedback ? (
        <div className='feedback-card-container'>
          {feedback && feedback.length ? (
            feedback
              .slice(minValue, maxValue)
              .map(feedback => (
                <FeedbackCard
                  key={uuid()}
                  rating={<FeedbackRating rating={feedback.rating} />}
                  feedback={feedback.feedback}
                  topic={feedback.appointment_topic}
                  date={feedback.appointment_datetime.slice(0, 15)}
                  coachFirstName={feedback.first_name}
                  coachLastName={feedback.last_name}
                  avatarUrl={feedback.avatar_url}
                />
              ))
          ) : (
            <EmptyFeedback />
          )}
        </div>
      ) : (
        <div className='loaderStyled'>
          <Loader
            type='TailSpin'
            color='#2BAD60'
            height={80}
            width={80}
          />
        </div>
      )}
      <div className='pagination'>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={6}
          onChange={handlePagination}
          total={feedback && feedback.length}
        />
      </div>
    </StyledFeedback>
  );
};

const mapStateToProps = state => {
  return {
    feedback: state.feedbackReducer.feedback,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, { getFeedback })(Feedback);
