import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import Main from './components/Main/Main.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
      <Provider store={store}>
            <Main />
      </Provider>
)
