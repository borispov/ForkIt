import React, { Fragment } from 'react';
import styled, {css} from 'styled-components';
import RecipeCard from './recipe/RecipeCard';
import RecipeItem from './recipe/RecipeItem';
import { Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

// const mapRecipeCards = (rec, key) => <RecipeCard key recipeData={rec} />
const mapRecipeItems = (rec ,key) => <RecipeItem key={key} recipeData={rec} />

const Wrapper = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${remcalc(150)};
`

const RowWrapper = styled.div`
  margin: 0 auto;
`

const RecipeList = ({ data }) => (
  <Wrapper>
    <Col css="z-index: -1" xs={12}>
      <Row>
        <RowWrapper>
            {
              data && 
                data.map(mapRecipeItems)
            }
        </RowWrapper>
      </Row>
    </Col>
  </Wrapper>
);



export default RecipeList;
