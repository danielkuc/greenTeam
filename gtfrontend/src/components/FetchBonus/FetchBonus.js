import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik'
import { Accordion, Row, Col, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './FetchBonus.styled';
import apiClient from '../../services/api';
import { SubmitButton, BonusElement } from '../../components';

const FetchBonus = () => {
  // Loading button state
  const [isLoading, setIsLoading] = useState(false);
  // data state - populated by fetching data from API.
  const [data, setData] = useState([]);
  // state of data filter input fields
  const[filterInput, setFilterInput] = useState({filterFirstName:'', filterLastName:''});
  // Yup validator
  const validator = yup.object({
    date: yup.date(),
    date_from: yup.date(),
  });
// Method  to fetch data from DB
  const handleSUbmit = async (values) => {
    setIsLoading(true)
    try {
      await apiClient.post('request/bonus', values).then(response =>
      {
        setIsLoading(false);
        // change date format to miliseconds for easier sorting and add it in a new attribute to response
        const result = response.data.map(obj => 
          {
            const dateObj = new Date(obj['bonus_date']);
            const dateConverted = dateObj.getTime();
            return {...obj, dateInMs: dateConverted}
          });
        setData(result);
      });
    } catch (error) {
      console.log(error);      
      isLoading(false);
    }
  }

  const sortArray = type => {
    // object with values of option JSX element corresponding to properties of objects in the state
    const types = {
      bogofAscending: 'bogof',
      bogofDescending: 'bogof',
      coatingAscending: 'coatings',
      coatingDescending: 'coatings',
      cxAscending: 'cx_number',
      cxDescending: 'cx_number',
      dateDescending: 'dateInMs',
      dateAscending: 'dateInMs',
      designerAscending: 'designer_frames',
      designerDescending: 'designer_frames '
    };
    // find the value of key in types, matching passed type
    const sortProperty = types[type];
    // sort data by passed type in ascending order
    const sorted = [...data].sort((a, b) => a[sortProperty] - b[sortProperty])
    // .filter(obj => obj['first_name'].toLowerCase() === "bruce");
    if (type.includes("Descending")) {
      return setData(sorted.reverse());
    } 
    let test = sorted;
    console.log(test);
    return setData(sorted);
  };

  return (
    <>
      <CONTAINER>
        <Accordion
          defaultActiveKey="0"
          className="py-4"
        >
          <Accordion.Header>
            Search parameters
          </Accordion.Header>
          <Accordion.Body>
            <Formik
              validationSchema={validator}
              onSubmit={handleSUbmit}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ 
                date_from: '',
                date_to: '',
               }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors
              }) => (
                <Form
                  onSubmit={handleSubmit}
                >
                  <Row md={2}>
                    {/* Search by date range  */}
                  <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="date_from"
                        label="Date from"
                      >
                        <Form.Control
                          type="date"
                          name="date_from"
                          placeholder="Date to"
                          value={values.date_from}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.date_from}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.date_from}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 

                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="date_to"
                        label="Date to"
                      >
                        <Form.Control
                          type="date"
                          name="date_to"
                          placeholder="Date to"
                          value={values.date_to}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.date_to}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.date_to}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 
                  </Row>
                  <SubmitButton state={isLoading} />
                </Form>
              )}
            </Formik>
          </Accordion.Body>
        </Accordion>
        <Row className="d-flex justify-content-center">
          <Col md={2}>
            <select className="form-control" name="sort" defaultValue="Sort by:" onChange={(e) => sortArray(e.target.value)}>
                <option value="dateDescending">Date - desc</option>
                <option value="dateAscending">Date - asc</option>
                <option value="bogofAscending">2-4-1 - asc</option>
                <option value="bogofDescending">2-4-1 - desc</option>
                <option value="designerAscending">Designer Frames - asc</option>
                <option value="designerDescending">Designer Frames - desc</option>
                <option value="cxAscending">Cx Number - asc</option>
                <option value="cxDescending">Cx Number - desc</option>
                <option value="firstNameAscending">Name - asc</option>
                <option value="coatingAscending">Coatings - asc</option>
                <option value="coatingDescending">Coatings - desc</option>
            </select>
          </Col>
          <Col md={3}>
            <Form>
            <Form.Group>
                      <FloatingLabel
                        controlId="filterFirst"
                        label="Filter by first name"
                      >
                        <Form.Control 
                          type="text"
                          name="filterFirst"
                          placeholder="Bob"
                          // value={values.email}
                          // onBlur={handleBlur}
                          // onChange={handleChange}
                          // isInvalid={errors.email}
                        />
                        <FormControl.Feedback type="invalid">
                          {/* {errors.email} */}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>
            </Form>
          </Col>
        </Row>
      </CONTAINER>
      {data.map((element, index) => (<BonusElement key={index} bonus={element} />))}
    </>
  )
}

export default FetchBonus
