
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MediaPanel from './Media-panel';

import {mediaItemsRequest, getMediaItemsSuccess, getMediaItemsFailed} from '../types/services'

afterEach(cleanup);

const mediaPanelInitialState = {
  loading: false,
  mediaItems: [],
  error: ''
};

const redecur = (state=mediaPanelInitialState, action) => {
  console.log("action......", action)
  switch(action.type) {
    case mediaItemsRequest: 
        return {
            ...state,
            loading: true
        }
    case getMediaItemsSuccess: 
        return {
            ...state,
            loading: false,
            mediaItems: action.payload
        }
    case getMediaItemsFailed: 
        return {
            ...state,
            loading: false,
            mediaItems: [],
            error: action.payload
        }
    default:
        return state    
  }
};

const renderWithRedux = (component, {initialState, store=createStore(redecur, initialState)} = {}) =>{
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

test('renders with redux', () => {
  const { getByTestId, getByText} = renderWithRedux(<MediaPanel />)
  console.log("fireEvent.....")
});
