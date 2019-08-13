import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Col, Row } from 'react-styled-flexboxgrid';
import Flex from 'styled-flex-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCube } from '@fortawesome/free-solid-svg-icons';
import { faStackExchange  } from '@fortawesome/free-brands-svg-icons';
import { css } from 'styled-components';

export const CardWrapper = styled.div`
  overflow: hidden;
  &:nth-child(even) {
    background: linear-gradient(to bottom, ${props=> props.theme.offtext}33 10%,  ${props => props.theme.cta}22 90%);
    color: ${props => props.theme.main};
  }
  color: ${props => props.theme.main};
  padding: 0 0 32px;
  margin: 24px auto;
  width: 340px;
  font-family: ${props => props.theme.card.font || `arial, sans-serif`};
  box-shadow: 0 0 10px rgba(20,20,20,0.1) 0 0 20px rgba(10,10,10,0.2);
  border-radius: 2px;
  border-radius: 6px;
`

export const CardHeader = styled.header`
  padding: ${remcalc(12)} ${remcalc(12)} ${remcalc(2)};
  margin-bottom: ${remcalc(-16)};
`

export const CardAuthor = styled.h4`
  font-size: ${remcalc(14)};
  &:nth-child(even) {
    color: black;
  }
  color: ${props => props.theme.lightgray};
  padding-top: 6px;
  font-weight: 300;
  font-family: 'Montserrat';
`

export const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
`

export const CardHeadingSub = styled.h3`
  font-size: 18px;
  font-weight: ${props => props.SubFontSize || '400'};
  padding-top: -8px;
  padding-bottom: 8px;
`

export const CardBody = styled.div`
  padding-right: 12px;
  padding-left: 12px;
`

export const CardParagraph = styled.p`
  font-size: 17px;
  color: ${props => props.theme.main || '#d9d2d9'};
  line-height: ${props => props.theme.lineHeight || '1.35'};
  padding-top: ${props => props.nomg ? '0px' : '12px'};
  padding-bottom: 16px;
  margin: ${ props => props.nomg ? '0' : 'default' };
  margin-top: -8px;
`

const Icon = styled(FontAwesomeIcon)`
  // position: relative;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.main};
`

const InfoIcon = styled(Icon)`
  left: 40%;
  max-width: ${remcalc(30)};
  max-height: ${remcalc(30)};
  opacity: 1;
  transition: all 0.2s ease;
  padding-bottom: ${remcalc(14)};
`

const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const InfoSpan = styled.span`
  padding-top: ${remcalc(32)};
  padding-left: ${remcalc(8)};
  text-align: center;
  z-index: 1;
`

const IngridientIcon = styled(InfoIcon)`
  z-index: 9;
`

const IngWrp = styled(InfoSpan)`;
  z-index: 999;
`

const IngridientListWrapper = styled.div`
  width: ${remcalc(200)};
  height: auto;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background-color: rgba(20,20,20,0.4);
  color: ${props => props.theme.white};
  font-size: ${remcalc(16)};
  font-family: 'Mono Space';
  font-weight: bold;
  position: absolute;
  bottom: 140%;
  right: -38%;
  z-index: 1;
  transform: translateX(-10%);
  ${IconsWrapper}:hover & {
    opacity: 0.8;
  }
`


export const CardInstructions = ({ recipes }) => (
  <Flex>
    <Col xs={12}>
      <Row >
        <Col md={4} xs={4} lg={4} >
          <IconsWrapper>
              <InfoIcon icon={faClock} />
              <InfoSpan>{recipes.time} min</InfoSpan>
          </IconsWrapper>
        </Col>

        <Col md={4} xs={4} lg={4}>
          <IconsWrapper>
            <InfoIcon icon={faCube} />
            <InfoSpan>{recipes.difficulty}</InfoSpan>
          </IconsWrapper>
        </Col>

        <Col md={4} xs={4} lg={4}>
          <IconsWrapper>
            <IngridientIcon icon={faStackExchange} />
            <IngWrp>Ingridients</IngWrp>
            <IngridientListWrapper>
              <ol>
                {
                  // TODO :: Use different key instead of index value
                  recipes.ingridients.map((item, idx) => 
                    <li key={idx}>
                      {item.amount} : {item.type} 
                    </li>
                  )
                }
              </ol>
            </IngridientListWrapper>
          </IconsWrapper>
        </Col>
      </Row>
      <hr />
      <Row>
        <CardParagraph nomg lineHeight={'1.15'}>
          {recipes.instructions}
        </CardParagraph>
      </Row>
    </Col>
  </Flex>
)
