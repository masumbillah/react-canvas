import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Redux store
import  store from '../src/services/store'

//Components
import App from './App';
import Canvas from './Components/Canvas';

afterEach(cleanup);

const renderWithRedux = (component) =>{
  return {
    ...render(<Provider store={store}> <DndProvider backend={HTML5Backend}>{component}</DndProvider></Provider>)
  }
}

//Test method of app rendering with redux store
test('app render with redux', () => {
  const { getByTestId, getByText } = renderWithRedux(<App />)
  console.log("01. App render with redux");
});


//Test method of template copy button for dynamic change content 
test('copy button content testing before click', () => {
  const { getByTestId, getByText} = renderWithRedux(<App />)
  expect(getByTestId('js-copy-button')).toHaveTextContent('Copy')
  console.log("02. Button Content testing before click");
});

//Test method of template copy button for dynamic change content 
test('copy button content testing after click', () => {
  const { getByTestId, getByText} = renderWithRedux(<Canvas />);
  const btnEl = getByTestId('js-copy-button');
  fireEvent.click(btnEl);

  expect(btnEl).toHaveTextContent('Copied!')
  console.log("03. Button Content testing after click");
});
