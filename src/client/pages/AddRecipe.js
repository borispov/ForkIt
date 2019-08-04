import React, { Fragment } from 'react';
import PageLayout from '../components/PageLayout';
import { Col, Row } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc';
import styled from 'styled-components';
import Container from '../components/styling/Container';

const initialState = {
  name: '',
  description: '',
  instructions: '',
  ingridients: '',
  image: '',
  difficulty: null,
  author: '',
}

class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log('Inside onchange handler ')
    console.log(e)
  }

  render() {
    return (
      <React.Fragment>
        <PageLayout>
          <button onClick={console.log('sdsdsdsd')}>SDSDSD</button>
          <input 
            value={this.state.name}
            onClick={e => this.handleChange(e.target.value)}
            type="text" 
            name="test" 
            placeholder="testinput" 
          />
        </PageLayout>
      </React.Fragment>
    )
  }
}

export default AddRecipe
