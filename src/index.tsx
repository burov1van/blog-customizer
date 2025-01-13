import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App'; // <-- Импорт вашего нового файла App.tsx

import './styles/index.scss'; // если у вас глобальные стили, оставляем этот импорт

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
