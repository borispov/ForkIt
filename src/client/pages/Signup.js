import React, { Fragment } from 'react';
import PageLayout from '../components/PageLayout';
import { Col, Row } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc';
import styled from 'styled-components';
// import Input from '../components/styling/Input';
import Btn from '../components/styling/Btn';
import { FormGroup, Label, Input } from '../components/Forms';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cpassword: '',
}

const Wrapper = styled.div`
  max-width: 520px;
  margin: 0 auto;
  margin-top: 100px;
`

const FormWrapper = styled.div`
  background: ${props => props.theme.lightgray}22;
  display: flex;
  flex-flow: column wrap;
`

const Button = styled.button`
  
`


class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
  }

  handleChange = (e) => {
    console.log('Inside onchange handler ')
    console.log(e.target.name)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Submit handler ...')
  }

  render() {
    return (
      <React.Fragment>
        <PageLayout>
          <Wrapper>
            <Col>
                <form
                  onSubmit={this.handleSubmit}
                >
                    <FormGroup>
                      <Input
                        defaultValue={this.state.name}
                        type="text" 
                        name="firstName" 
                        placeholder="First..." 
                        onChange={this.handleChange}
                      />
                      <Input
                        defaultValue={this.state.name}
                        type="text" 
                        name="lastName" 
                        placeholder="Last ..." 
                        onChange={this.handleChange}
                      />
                    <Input
                      placeholder="john@doe.com"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <Input
                      type="cpassword"
                      name="cpassword"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Btn type="submit">Register!</Btn>
                  </FormGroup>
                </form>
            </Col>
          </Wrapper>
        </PageLayout>
      </React.Fragment>
    )
  }
}

export default AddRecipe
