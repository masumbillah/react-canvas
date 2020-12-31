import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Redux store
import  store from '../src/services/store'
import App from './App';

afterEach(cleanup);

const mediaPanelInitialState = {
  loading: false,
  mediaItems: [],
  error: ''
};

const renderWithRedux = (component, {mediaPanelInitialState} = {}) =>{
  return {
    ...render(<Provider store={store}> <DndProvider backend={HTML5Backend}>{component}</DndProvider></Provider>)
  }
}

//Test method of app rendering with redux store
test('app render with redux', () => {
  const { getByTestId, getByText } = renderWithRedux(<App />)
  console.log("App render with redux");
});


//Test method of template copy button for dynamic change content 
test('modal open testing', () => {
  const { getByTestId, getByText} = renderWithRedux(<App />)
  expect(getByTestId('js-copy-button')).toHaveTextContent('Copy'||'Copied!')
  console.log("Button Content testing");
});


//Test method of open modal 
test('button content testing', () => {
   const propsOfModal = {
    "id": "iyo44nbt",
    "name": "Walter White",
    "img": "https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg",
    "filters": {
      "brightness": "100",
      "hueRotate": "207",
      "saturate": "100",
      "contrast": "100"
    }
  };

  const { getByTestId, getByText} = renderWithRedux(<App />)
  console.log("Open modal testing");
});


//Test method of close modal 
test('button close testing', () => {
  const { getByTestId, getByText} = renderWithRedux(<App />)
  console.log("Close modal testing");
});
