import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { register } from '../../state/actions/authenticationActions';
import { StyledButton, buttonTheme } from '../Landing';
import {
  GreyBackgroundContainer,
  FormCard,
  FormContainer,
} from './LoginForm';

const RegisterCard = styled(FormCard)`
  width: 27em;
  height: 35em;
  font-family: ABeeZee;

  h1 {
    font-size: 24px;
  }
`;

const StyledError = styled.p`
  padding: 0;
  margin: 0;
  color: red;
  font-size: 0.8rem;
`;

const ThisGreyBackgroundContainer = styled(GreyBackgroundContainer)`
  font-family: ABeeZee;
`;

function CoachForm({ errors, touched }) {
  const handleUserRoleSubmit = () => {};
  return (
    <ThisGreyBackgroundContainer>
      <RegisterCard>
        <h1>Coach Form</h1>
        <FormContainer>
          <Form>
            <div>
              <Field type='text' name='city' placeholder='Location' />
              {errors.city && touched.city && (
                <StyledError>{errors.city}</StyledError>
              )}
            </div>
            <div>
              <Field
                type='text'
                name='experience'
                placeholder='Select Level Of Experience'
              />
              {errors.experience && touched.experience && (
                <StyledError>{errors.experience}</StyledError>
              )}
            </div>
            <div>
              <Field type='text' name='skills' placeholder='Skills' />
              {errors.skills && touched.skills && (
                <StyledError>{errors.skills}</StyledError>
              )}
            </div>
            <div>
              <Field
                type='text'
                name='description'
                placeholder='Description'
              />
              {errors.description && touched.description && (
                <StyledError>{errors.description}</StyledError>
              )}
            </div>
            <div>
              <StyledButton
                theme={buttonTheme}
                onClick={handleUserRoleSubmit}
                type='submit'
              >
                {' '}
                Submit{' '}
              </StyledButton>
            </div>
          </Form>
        </FormContainer>
      </RegisterCard>
    </ThisGreyBackgroundContainer>
  );
}

const FormikCoachForm = withFormik({
  mapPropsToValues({ city, experience, skills, description }) {
    return {
      city: city || '',
      experience: experience || '',
      skills: skills || '',
      description: description || '',
    };
  },
  validationSchema: Yup.object().shape({
    city: Yup.string().required('Please enter your location'),
    experience: Yup.string().required('Please enter your experience'),
    skills: Yup.string().required('Please enter your skills'),
    description: Yup.string().required('Please enter a description'),
  }),
  handleSubmit(values, { props, resetForm }) {
    resetForm();
    props.register(props, values);
  },
})(CoachForm);

export default connect(state => state, { register })(FormikCoachForm);
