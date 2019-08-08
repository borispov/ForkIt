import React, { Fragment } from 'react';
import PageLayout from '../components/PageLayout';
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc';
import styled from 'styled-components';
import Btn from '../components/styling/Btn';
import { FormGroup, Label, Input, Select, TextArea } from '../components/Forms';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE } from '../../queries';
import gql from 'graphql-tag'
import * as Cookie from 'js-cookie';

const ADDR = gql`
  mutation AddRecipe(
    $name: String!,
    $description: String!,
    $instructions: String!,
    $difficulty: String!,
    $image: String,
    $ingridients: [Ingr],
  ) {
    addRecipe(name: $name, description: $description, instructions: $instructions, difficulty: $difficulty, ingridients: $ingridients, image: $image) {
      name
      description
    }
  }
`

const initialState = {
  name: '',
  description: '',
  image: '',
  difficulty: 'Choose Difficulty',
  author: '',
}

const Wrapper = styled.div`
  max-width: 660px;
  margin: 0 auto;
  margin-top: 100px;
`

const FormWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`

const AddBtn = styled(Btn)`
  border-radius: 6px;
  margin-left: 8px;
  height: 30px;
  font-size: 13px;
`

// TODO: Think of a way to implement this feature. 
// User can add as many inputs as he needs. 
// Any time he adds, a new input appears. 
//
const isEq = v1 => v2 => v1 === v2
const renderIngridientInput = values => handler => btnHandler => {

  return values
    .map((obj, i) => (
      <div key={i} style={{display: 'flex', justifyContent: 'space-between', width: '250px'}}>
        <Input
          key={i + 't'}
          data-key={i + 't'}
          animate={true}
          value={obj.type}
          name="iType"
          placeholder="type"
          width="auto"
          onChange={handler}
        />
        <Input
          key={i + 'a'}
          data-key={i + 'a'}
          animate={true}
          value={obj.amount}
          name="iAmount"
          placeholder="amnt"
          width='33px'
          onChange={handler}
        />
        <AddBtn type="button" onClick={btnHandler}>add</AddBtn>
    </div>
    ))
}

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
      rows: 5,
      minRows: 5,
      maxRows: 25,
      instructions: '',
      ingridients: [{}],
    }
  }

  handleTextChange = e => {
    const { minRows, maxRows } = this.state
    const lineHeight = 24
    const prevRows = this.state.rows
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
      rows: currentRows < maxRows ? currentRows : maxRows,
      instructions: e.target.value
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

  addIngridient = () => {
    const ing = this.state.ingridients
    const { iType, iAmount } = this.state
    const isErr = iType === undefined

    if (isErr){
      this.setState(prevState => ({
        ...prevState,
        errorMsg: {
          ...errorMsg,
          ingErr: 'Please specify ingridient'
        }
      }))

      return null
    }

    const ingObj = { type: iType, amount: iAmount || '' }
    const newIng = [ingObj, ...ing]
    this.setState(prevState => ({
      ...prevState,
      iType: '',
      iAmount: '',
      ingridients: newIng,
      errorMsg: {
        ...prevState.errorMsg,
        ingErr: null
      }
    }))
  }

  // Bit reversed implementation of validation function, lol.
  isValidForm = (name, ingridients, instructions, difficulty) => {
    const isValid = !name || !ingridients || !instructions || !difficulty
    return !isValid
  }

  handleSubmit = (e, addRecipe) => {
    e.preventDefault()
    // const isVal = this.isValidForm(name,instructions,ingridients,difficulty)
    const isVal = true
    if (!isVal) {
      this.setState({errorMsg: 'Please Fill The Form'})
      return null
    }
    console.log(this.state)
    addRecipe()
      .then(({data}) => console.log(data))
      .catch(() => 'Ran Into An Error Mutating Data')
  }

  render() {
    const { description, ingridients, name, instructions, difficulty, image } = this.state
    this.state;
    // join all errors and display them in a multiline string
    const anyError = Object.values(this.state.errorMsg).filter(val => val !== null).join('\n')

    return (
      <React.Fragment>
        <PageLayout>
          <Wrapper>
            <Col>

              <Mutation mutation={ADDR} variables={{ ingridients: ingridients.slice(0,-1), name, instructions, difficulty, description, image }} >

                {(addRecipe, {data}) => {

                  return ( <form onSubmit={e => this.handleSubmit(e, addRecipe)}>
                    <FormWrapper>
                      <Col>
                        <FormGroup>
                          <Label> Recipe's Name:</Label>
                          <Input
                            defaultValue={this.state.name}
                            type="text" 
                            name="name" 
                            placeholder="Title" 
                            onChange={this.handleChange}
                          />
                          <Label>Describe Your Dish: </Label>
                          <Input
                            defaultValue={this.state.description}
                            type="text"
                            name="description"
                            placeholder="An Italian Masterpiece, Great For Diner"
                            onChange={this.handleChange}
                          />
                          <Label>Difficulty:</Label>
                          <Select value={this.state.difficulty} onChange={this.handleSelect}>
                            <option value='HARD'>-HARD-</option>
                            <option value='MEDIUM'>-MEDIUM-</option>
                            <option value='EASY'>-EASY-</option>
                          </Select>
                          <Input
                            defaultValue=''
                            type='text'
                            name="image"
                            placeholder="Image URL"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Ingridients:</Label>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            {
                              renderIngridientInput(ingridients)(this.handleChange)(this.addIngridient)
                            }
                            {this.state.errorMsg.ingErr && <Label>{this.state.errorMsg.ingErr}</Label>}
                            {/* }<Btn width="250px" type='button' onClick={this.addIngridient}>Add MORE</Btn>*/}
                          </div>
                          <Label>Instructions:</Label>
                          <TextArea
                            rows={this.state.rows}
                            name="ingridientAmount"
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
                      <Btn type="submit">Add Dish!</Btn>
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

export default AddRecipe



// -- when you start adding an ingridient: it adds an object to an array.
// ings: {
// [
//  {id: 1, type: 'eggs', amount: 10},
//  {id: 2, type: 'salt', amount: '2 tbls'}
// ]
// }
