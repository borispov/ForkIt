import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import * as Cookie from 'js-cookie';

import { SIGNUP_USER } from '../../queries';
import Btn from '../components/styling/Btn';
import { FormGroup, Label, Input } from '../components/Forms';
import PageLayout from '../components/PageLayout';

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

const initInputState = {
  firstName: '',
  lastName: '',
  pw: '',
  cpw: ''
}


// TODO: do some cleanup work with useEffect after the component unmounts.
const SignUp = (props) => {

  const [inputs, setInput] = useState({...initInputState})
  const [errors, setError] = useState({pwError: '', emailError: ''})
  const [isValidating, setValidatin] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setInput({
      ...inputs,
      [name]: value
    })
  }

  useEffect(() =>
    () => {
      setInput({...initInputState})
      setError({pwError: '', emailError: ''})
  },[])

  const handleSubmit = (e, signupUser) => {
    e && e.preventDefault()
    const { pw, cpw } = inputs
    console.log(pw,cpw)
    pwMatch(pw)(cpw) ?
      signupUser().then(async ({ data }) => {
        Cookie.set('token', data.signupUser.token)
        await props.refetch()
        props.history.push('/Home')
      }) :
      console.log('pw dont match. please fix this.')
  }

  const pwMatch = p1 => p2 => {
    console.log(`p1: ${p1} and p2: ${p2}`)
    return p1 === p2
  }

  return (
    <div>
      <PageLayout>
        <Wrapper>
          <Col>

            <Mutation mutation={ SIGNUP_USER } variables={{
              firstName: inputs.firstName,
              lastName: inputs.lastName,
              email: inputs.email,
              password: inputs.pw
            }} >

              {(signupUser, {data}) => {
                return (
                  <form onSubmit={e => handleSubmit(e, signupUser)}>
                    <FormGroup>
                      <Input
                        value={inputs.firstName}
                        type="text"
                        name="firstName"
                        placeholder="שם פרטי"
                        onChange={handleChange}
                        minLength={3}
                        required
                      />
                      <Input
                        value={inputs.lastName}
                        type="text"
                        name="lastName"
                        placeholder="שם משפחה"
                        onChange={handleChange}
                        required
                        minLength={2}
                      />
                    <Input
                      placeholder="john@doe.com"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      placeholder="סיסמא"
                      type="password"
                      name="pw"
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                    <Input
                      placeholder="אימות סיסמא"
                      type="password"
                      name="cpw"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    {
                      errors.pwError &&
                        <Label>"סיסמא לא תואמת"</Label>
                    }
                    <Btn type="submit">הרשם!</Btn>
                  </FormGroup>
                  </form>

                )
              }}

            </Mutation>

          </Col>
        </Wrapper>
      </PageLayout>
    </div>
  )

}

export default withRouter(SignUp)
