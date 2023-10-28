import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import { store } from './common/store';
import reportWebVitals from './reportWebVitals';
import router from './router/Router';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DragDropContext onDragEnd={(result: any) => console.log(result)}>
        <RouterProvider router={router} />
      </DragDropContext>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
