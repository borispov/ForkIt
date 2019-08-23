import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SIGNIN_USER } from '../../queries';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-styled-flexboxgrid'
import * as Cookie from 'js-cookie';

import { FormGroup, Label, Input } from '../components/Forms';
import Btn from '../components/styling/Btn';
import PageLayout from '../components/PageLayout';

const Wrapper = styled.div`
  max-width: 620px;
  margin-top: 130px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

const initState = {
  email: '',
  pw: '',
  err: ''
}

const Login = (props, { refetch }) => {

  const [inputs, setInput] = useState({...initState})
  const cleanUp = () => setInput({...initState})
  useEffect(() => () => { 
    console.log('Cleaning Up...')
    return cleanUp()
  },[])

  const handleSubmit = (e, signinUser) => {
    e.preventDefault()
    console.log('Submitting...')
    signinUser().then(async ({data}) => {
      Cookie.set('token', data.signinUser.token)
      await props.refetch()
      console.log('logged in successfuly')
      props.history.push('/home')
    }).catch(() => {
      console.log('error occured')
      useState({...initState, err: 'incorrect email or password'})
    })
  }

  const handleChange = e => {
    console.log('state before change: ', inputs)
    const {name, value} = e.target
    setInput({...inputs, [name]: value})
  }

  return (
    <PageLayout>
      <Wrapper>
        <Col>
          <Mutation mutation={ SIGNIN_USER } variables={{
            email: inputs.email,
            password: inputs.pw
          }} >

            {(signinUser, {data}) => {
              return (
                <form onSubmit={event => handleSubmit(event, signinUser)}>
                  <FormGroup>
                    <Input
                      value={inputs.email}
                      type="email"
                      name="email"
                      placeholder="אימייל"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      value={inputs.pw}
                      type="password"
                      name="pw"
                      placeholder="סיסמא"
                      onChange={handleChange}
                      required
                    />
                </FormGroup>
                <FormGroup>
                  {
                    inputs.err &&
                      <Label>"סיסמא לא תואמת"</Label>
                  }
                  <Btn type="submit">Login</Btn>
                </FormGroup>
                </form>

              )
            }}

          </Mutation>

        </Col>
      </Wrapper>
    </PageLayout>
  )
}

export default withRouter(Login)
