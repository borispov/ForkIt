import React, { Fragment } from 'react';
import styled, {css} from 'styled-components';
import RecipeCard from './recipe/RecipeCard';
import RecipeItem from './recipe/RecipeItem';
import { Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import withSession from '../hoc/withSession';

const mapRecipeCards = (rec, idx) => (email) => <RecipeCard email={email} key={idx} recipeData={rec} />
const mapRecipeItems = (rec ,idx) => (email) => <RecipeItem email={email} key={idx} recipeData={rec} />

const Wrapper = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${remcalc(150)};

`

const RowWrapper = styled.div`
  margin: 0 auto;
`



const RecipeList = ({ data, layout = 'card', session = {} }) => {

  const objEmpty = obj => !!Object.keys(obj)
  const email = !objEmpty(session) && session.getCurrentUser.email || ''

  const listLayout = 
    layout === 'card' ? 
    (data.map((rec,idx) => mapRecipeCards(rec,idx)(email))) :
    ( <RowWrapper>{data.map((rec,idx) => mapRecipeItems(rec,idx)(email))}</RowWrapper> )

  return (
    <Wrapper>
      <Col css="z-index: -1" xs={12}>
        <Row>
              { 
                data && 
                  listLayout
              }
        </Row>
      </Col>
    </Wrapper>
  );
}



export default withSession(RecipeList);
