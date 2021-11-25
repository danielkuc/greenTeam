import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Row, Col, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './AddBonus.styled';
import apiClient from '../../services/api';
import { useUserState } from '../../state';
import { DisplayModal, SubmitButton } from '../../components';

const AddBonus = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserState();

  const validator = yup.object({
    cx_number: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer').required('Cx number is required'),
    bonus_date: yup.date().required('Date required'),
    bogof: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer'),
    designer_frames: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer'),
    coatings: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer')
  });

  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true)
    const payload = {
      ...values,
      user_id: user.id
    }
    try {
      await apiClient.post('add/bonus', payload)
      setIsLoading(false)
      resetForm()
      setShow(true)
    } catch (error) {
      setIsLoading(false) 
      return error
    }
  }

  return (
    <>
      <CONTAINER fluid="md" className="pt-5">
        <DisplayModal 
          body="Bonus added successfully"
          state={show}
          success="Success!"
          buttonValue="Go back"
          setState={setShow}
        />
        <p className="text-center py-4 h3">Add new bonus entry</p>
        <Row className="justify-content-center">
          <Col md={9} lg={8} xl={7}>
            {/* Formik form */}
            <Formik
              validationSchema={validator}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{ 
                cx_number: '',
                bonus_date:'0',
                bogof:'0',
                designer_frames: '0',
                coatings: '0',
               }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors
              }) =>(
                <Form 
                  onSubmit={handleSubmit}
                >
                  <Row md={2}>
                    {/* customer number */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="cx_number"
                        label="Customer Number"
                      >
                        <Form.Control
                          type="number"
                          name="cx_number"
                          placeholder="123456"
                          value={values.cx_number}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.cx_number}                          
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.cx_number}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    {/* bonus date */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="bonus_date"
                        label="Bonus Date"
                      >
                        <Form.Control
                          type="date"
                          name="bonus_date"
                          placeholder="2021/12/01"
                          value={values.bonus_date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.bonus_date}                          
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.bonus_date}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row md={3} className="pt-4">
                    {/* buy one get one free */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="bogof"
                        label="Two-for-one"
                      >
                        <Form.Control 
                          type="number"
                          name="bogof"
                          placeholder="Two-for-one"
                          value={values.bogof}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.bogof}
                        />
                        <FormControl.Feedback type="invalid" >
                          {errors.bogof}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    {/* designer frames */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="designer_frames"
                        label="Designer frames"
                      >
                        <Form.Control 
                          type="number"
                          name="designer_frames"
                          placeholder="Designer Frames"
                          value={values.designer_frames}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.designer_frames}
                        />
                        <FormControl.Feedback type="invalid" >
                          {errors.designer_frames}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    {/* Coatings */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="coatings"
                        label="Coatings"
                      >
                        <Form.Control 
                          type="number"
                          name="coatings"
                          placeholder="Coatings"
                          value={values.coatings}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.coatings}
                        />
                        <FormControl.Feedback type="invalid" >
                          {errors.coatings}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <SubmitButton state={isLoading} />
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </CONTAINER>
    </>
  )
}

export default AddBonus
