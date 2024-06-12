import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setFormData } from '../store/slices/formSlice';

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

interface MyFormProps {
  onSubmit: () => void;
  onReset: () => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const MyForm: React.FC<MyFormProps> = ({ onSubmit, onReset }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    // Dispatches the form data to the Redux store using the setFormData action inside formSlice.
    dispatch(setFormData(data));
    setSubmitStatus({
      type: 'success',
      message: 'Form submitted successfully!',
    });
    onSubmit();
  };

  const handleReset = () => {
    reset({
      name: '',
      email: '',
      password: '',
    });
    setSubmitStatus(null);
    onReset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      {submitStatus ? (
        <Alert variant={submitStatus.type === 'success' ? 'success' : 'danger'}>
          {submitStatus.message}
        </Alert>
      ) : null}
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Enter your name"
          type="text"
          {...register('name')}
          className={`form-control ${errors.name && touchedFields.name && dirtyFields.name ? 'is-invalid' : ''}`}
        />
        {errors.name && touchedFields.name && dirtyFields.name ? (
          <Form.Text className="text-danger">{errors.name.message}</Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group className="mt-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder="Enter your email"
          type="email"
          {...register('email')}
          className={`form-control ${errors.email && touchedFields.email && dirtyFields.email ? 'is-invalid' : ''}`}
        />
        {errors.email && touchedFields.email && dirtyFields.email ? (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group className="mt-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Password"
          type="password"
          {...register('password')}
          className={`form-control ${errors.password && touchedFields.password && dirtyFields.password ? 'is-invalid' : ''}`}
        />
        {errors.password && touchedFields.password && dirtyFields.password ? (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        ) : null}
      </Form.Group>

      <Button
        className="mt-4"
        disabled={!isValid}
        type="submit"
        variant="primary"
      >
        Submit
      </Button>
      <Button
        className="mt-4 ms-2"
        disabled={!isDirty}
        onClick={handleReset}
        type="button"
        variant="warning"
      >
        Reset
      </Button>
    </Form>
  );
};

export default MyForm;
