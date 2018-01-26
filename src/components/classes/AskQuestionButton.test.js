import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import AskQuestionButton from './AskQuestionButton'

describe('<AskQuestionButton />', () => {
  const toggleLike = sinon.spy()
  const button = shallow(
    <AskQuestionButton
      students={[]}
    />
  )

  it('it renders an "ask question" button', () => {
    expect(button.find(".question-button").length).toEqual(1)
  })

  it('opens a dialog if ask-question-button is clicked', () => {
    expect(button.instance().selectStudent()).toEqual("No students in this class")
  })
})
