import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import PageLayout from '../components/PageLayout';
import { Col, Row } from 'react-styled-flexboxgrid'
import styled from 'styled-components';
import Btn from '../components/styling/Btn';
import { FormGroup, Label, Input, Select, TextArea } from '../components/Forms';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE } from '../../queries';
import gql from 'graphql-tag'
import * as Cookie from 'js-cookie';


const defaultDiff = 'תבחר רמת קושי'
const initialState = {
  name: '',
  description: '',
  image: '',
  difficulty: defaultDiff,
  author: '',
  time: 'N/A'
}

const Wrapper = styled.div`
  max-width: 660px;
  margin: 0 auto;
  margin-top: 100px;
`

const FormWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  > * {
    text-align: right;
  }
  @media (max-width: 768px){
    flex-direction: column;
  }
`

const AddBtn = styled(Btn)`
  border-radius: 6px;
  margin-left: 8px;
  height: 30px;
  font-size: 13px;
`

const isEq = v1 => v2 => v1 === v2

// only checks if instructions follow Line Break convention. if yes return true, if fails return false
const hasNewLine = str => /\r|\n/.test(str)
const ingPlaceholder = 'כל מרכיב בשורה חדשה:\n5 ביצים\nכוס חלב'

class AddRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
      errorMsg: {
        ingErr: null,
        mailErr: null,
        nameErr: null,
        instructions: null,
      },
      ingridientRows: 10,
      instructionRows: 10,
      minRows: 10,
      maxRows: 30,
      instructions: '',
      ingridients: '',
    }
  }

  handleTextChange = e => {
    const { name, value } = e.target
    const { minRows, maxRows } = this.state
    const lineHeight = 24
    const prevRows = this.state[name + 'Rows']
    e.target.rows = minRows
    const currentRows = ~~(e.target.scrollHeight / lineHeight)

    if (currentRows === prevRows) {
      e.target.rows = currentRows 
    }
    if ( currentRows >= maxRows ) {
        e.target.rows = maxRows,
        e.target.scrollTop = e.target.scrollHeight
    }
    this.setState({
      [name + 'rows']: currentRows < maxRows ? currentRows : maxRows,
      [name]: value
    })
  }

  handleSelect = e => {
    const prevDifficulty = this.state.difficulty
    const newDifficulty = e.target.value
    isEq(prevDifficulty)(newDifficulty) ?
      null :
      this.setState(prevState =>  ({...prevState, difficulty: newDifficulty}))
  }

  handleChange = (e) => {
    // TODO, add throttling\debouncing function here. avoid updating state on every keystroke.
    const { name, value } = e.target
    this.setState(
      prevState => ({
        ...prevState,
        [name]: value
      })
    )
  }

  // Bit reversed implementation of validation function, lol.
  isValidForm = (name, ingridients, instructions, difficulty) => {
    const isValid = !name || (!ingridients || !hasNewLine(ingridients)) || (!instructions || !hasNewLine(instructions)) || !difficulty !== defaultDiff
    return !isValid
  }

  handleSubmit = (e, addRecipe) => {
    const { name, ingridients, instructions, difficulty } = this.state
    e.preventDefault()
    const isVal = this.isValidForm(name,ingridients, instructions, difficulty)
    if (!isVal) {
      this.setState(prevState => ({
        ...prevState,
        errorMsg: {
          ...prevState.errorMsg,
          instructions: "נא למלא את התיבות"
        }
      }))
      return null
    }
    addRecipe()
      .then(({data}) =>{
        console.log('succesfully added recipe to the database...')
        //TODO: Can Add A Spinner to mimic a progress of adding recipe to database.
        // Can add setTimeout func
        this.props.history.push('/home')
      })
      .catch(() => 'Ran Into An Error Mutating Data')
  }

  render() {
    const { description, ingridients, name, instructions, difficulty, image, time } = this.state
    if (this.props.session) {
      console.log(this.props.session)
      const { firstName, lastName } = this.props.session.getCurrentUser
    }
    const author = this.props.session.getCurrentUser &&
      `${this.props.session.getCurrentUser.firstName} ${this.props.session.getCurrentUser.firstName}`  || 'anonymous'
    this.state;
    // join all errors and display them in a multiline string
    const anyError = Object.values(this.state.errorMsg).filter(val => val !== null).join('\n')

    return (
      <React.Fragment>
        <PageLayout>
          <Wrapper>
            <Col>

              <Mutation mutation={ ADD_RECIPE } variables={{ time, author, ingridients, name, instructions, difficulty, description, image }} >

                {(addRecipe, {data}) => {

                  return ( <form onSubmit={e => this.handleSubmit(e, addRecipe)}>
                    <FormWrapper>
                      <Col>
                        <FormGroup>
                          <Label> שם המתכון: </Label>
                          {/* <Label> Recipe's Name:</Label> */}
                          <Input
                            defaultValue={this.state.name}
                            type="text" 
                            name="name" 
                            placeholder="Title" 
                            onChange={this.handleChange}
                          />
                          {/* <Label>Describe Your Dish: </Label> */}
                          <Label>תיאור המנה: </Label>
                          <Input
                            defaultValue={this.state.description}
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                          />
                          <Label>רמת קושי:</Label>
                          <Select value={this.state.difficulty} onChange={this.handleSelect}>
                            <option value='קשה'>קשה</option>
                            <option value='בינוני'>בינוני</option>
                            <option value='קל'>קל</option>
                          </Select>
                          <Input
                            defaultValue=''
                            type='text'
                            name="image"
                            placeholder="לינק לתמונה"
                            onChange={this.handleChange}
                          />
                          <Label>זמן הכנה (בדקות) </Label>
                          <Input
                            defaultValue=''
                            type='text'
                            name="time"
                            placeholder="דוג׳: שעתיים הכנה = 120 דקות"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>מרכיבים: </Label>
                            <TextArea
                              placeholder={ingPlaceholder}
                              rows={this.state.rows}
                              name="ingridients"
                              onChange={this.handleTextChange}
                            />
                          <Label>הוראות הכנה</Label>
                          <TextArea
                            placeholder="כל שלב בשורה חדשה"
                            rows={this.state.rows}
                            name="instructions"
                            onChange={this.handleTextChange}
                          />
                        </FormGroup>
                      </Col>
                    </FormWrapper>
                      <div style={{margin: '0 auto', display: 'block', textAlign: 'center', width: 'auto'}}>
                        {
                          anyError &&
                            <Label style={{textAlign: 'center', color: 'red'}}>{ anyError }</Label>
                        }
                      <Btn type="submit">הוסף מתכון!</Btn>
                    </div>
                  </form>
                  )

                }}

                </Mutation>

            </Col>
          </Wrapper>
        </PageLayout>
      </React.Fragment>
    )
  }
}

const condFn = session => session && session.getCurrentUser
export default withAuth(condFn)(withRouter(AddRecipe))
