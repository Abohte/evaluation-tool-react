import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import AskQuestionButton from './AskQuestionButton'

describe('<AskQuestionButton />', () => {
  const toggleLike = sinon.spy()
  const redStudent = () => ({studentName: "Red Student", lastEvaluation: "red"})
  const yellowStudent = () => ({studentName: "Yellow Student", lastEvaluation: "yellow"})
  const greenStudent = () => ({studentName: "Green Student", lastEvaluation: "green"})
  const grayStudent = () => ({studentName: "Gray Student", lastEvaluation: null})

  it('it renders an "ask question" button', () => {
    const button = shallow(
      <AskQuestionButton
        students={[]}
      />
    )
    expect(button.find(".question-button").length).toEqual(1)
  })

  it('opens a dialog if ask-question-button is clicked', () => {
    const button = shallow(
      <AskQuestionButton
        students={[]}
      />
    )
    expect(button.instance().selectStudent(0)).toEqual("No students in this class")
  })

  it('selects a green student if it is the only one', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent()]}
      />
    )
    expect(button.instance().selectStudent(1)).toEqual("Green Student")
  })

  it('selects a gray student if it is the only one', () => {
    const button = shallow(
      <AskQuestionButton
        students={[grayStudent()]}
      />
    )
    expect(button.instance().selectStudent(42)).toEqual("Gray Student")
  })

  it('selects a red student if a number between 0-46 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(15)).toEqual("Red Student")
    expect(button.instance().selectStudent(0)).toEqual("Red Student")
    expect(button.instance().selectStudent(46)).toEqual("Red Student")
  })

  it('selects a yellow student if a number between 47-78 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(47)).toEqual("Yellow Student")
    expect(button.instance().selectStudent(60)).toEqual("Yellow Student")
    expect(button.instance().selectStudent(78)).toEqual("Yellow Student")
  })

  it('selects a green student if a number between 79-99 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(79)).toEqual("Green Student")
    expect(button.instance().selectStudent(81)).toEqual("Green Student")
    expect(button.instance().selectStudent(99)).toEqual("Green Student")
  })

  it('does not select a red student if a number between 47-99 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(48)).not.toEqual("Red Student")
    expect(button.instance().selectStudent(97)).not.toEqual("Red Student")
  })

  it('does not select a yellow student if a number under 47 or above 78 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(13)).not.toEqual("Yellow Student")
    expect(button.instance().selectStudent(79)).not.toEqual("Yellow Student")
  })

  it('does not select a green student if a number under 79 is given', () => {
    const button = shallow(
      <AskQuestionButton
        students={[greenStudent(), redStudent(), yellowStudent()]}
      />
    )
      expect(button.instance().selectStudent(42)).not.toEqual("Green Student")
    expect(button.instance().selectStudent(74)).not.toEqual("Green Student")
  })

  it('counts an unevaluated student as a green student', () => {
    const button = shallow(
      <AskQuestionButton
        students={[grayStudent(), redStudent(), yellowStudent()]}
      />
    )
    expect(button.instance().selectStudent(79)).toEqual("Gray Student")
    expect(button.instance().selectStudent(25)).not.toEqual("Gray Student")
  })
})
