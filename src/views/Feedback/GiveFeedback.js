import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
  giveFeedback,
  saveRating,
  saveFeedback,
} from '../../state/actions/feedbackActions';
import GiveRating from '../../components/DataVisualization/GiveRating';
import FeedbackInput from '../../components/Inputs/FeedbackInput';

const StyledGiveFeedback = styled.div`
  .button {
    background-color: #4fad65;
    font-weight: 200;
  }
`;

function GiveFeedback(props) {
  const { saveFeedback, saveRating } = props;
  return (
    <StyledGiveFeedback>
      <GiveRating saveRating={saveRating} />
      <FeedbackInput saveFeedback={saveFeedback} />
      <Button className='button' variant='contained' color='primary'>
        Submit
      </Button>
    </StyledGiveFeedback>
  );
}

const mapStateToProps = state => {
  return {
    coaches: state.marketplaceReducer.coaches,
    feedback: state.feedbackReducer.feedback,
  };
};

export default connect(mapStateToProps, {
  giveFeedback,
})(GiveFeedback);
