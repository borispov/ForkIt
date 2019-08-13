import React, {useState, useEffect} from 'react';
import { SIGNIN_USER } from '../../queries';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import * as Cookie from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { FormGroup, Label, Input } from '../components/Forms';
import Btn from '../components/styling/Btn';
import PageLayout from '../components/PageLayout';
import { Col } from 'react-styled-flexboxgrid'

const initState = {
  email: '',
  pw: '',
  err: ''
}

const Login = (props, { refetch }) => {
  const [inputs, setInput] = useState({...initState})
  const cleanUp = () => setInput({...initState})
  useEffect(() => () => cleanUp(),[])

  const handleSubmit = (e, signinUser) => {
    e && e.preventDefault()
    signinUser().then(async ({data}) => {
      Cookies.set('token', data.signinUser.token)
      await props.refetch()
    }).catch(() => {
      useState({...initState, err: 'incorrect email or password'})
    })
  }

  return (
    <PageLayout>
        <Col>

          <Mutation mutation={ SIGNUP_USER } variables={{
            email: inputs.email,
            password: inputs.pw
          }} >

            {(signinUser, {data}) => {
              return (
                <form onSubmit={e => handleSubmit(e, signupUser)}>
                  <FormGroup>
                    <Input
                      value={inputs.email}
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      value={inputs.pw}
                      type="password"
                      name="pw"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                </FormGroup>
                <FormGroup>
                  {
                    inputs.err &&
                      <Label>"Password don't match"</Label>
                  }
                  <Btn type="submit">Login</Btn>
                </FormGroup>
                </form>

              )
            }}

          </Mutation>

        </Col>
    </PageLayout>
  )
}

export default withRouter(Login)
