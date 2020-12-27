//Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'

//Redux store
import  store from '../src/services/store'

//Import app styles
import './themes/style.css';
import './themes/media-panel.css';
import './themes/canvas.css';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);