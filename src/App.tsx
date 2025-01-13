import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [bgColor, setBgColor] = useState(
		defaultArticleState.backgroundColor.value
	);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption.value
	);
	const [fontColor, setFontColor] = useState(
		defaultArticleState.fontColor.value
	);
	const [fontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption.value
	);
	const [containerWidth, setContainerWidth] = useState(
		defaultArticleState.contentWidth.value
	);

	const handleApply = (
		newBgColor: string,
		newFontFamily: string,
		newFontColor: string,
		newFontSize: string,
		newContainerWidth: string
	) => {
		setBgColor(newBgColor);
		setFontFamily(newFontFamily);
		setFontColor(newFontColor);
		setFontSize(newFontSize);
		setContainerWidth(newContainerWidth);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--bg-color': bgColor,
					'--font-family': fontFamily,
					'--font-color': fontColor,
					'--font-size': fontSize,
					'--container-width': containerWidth,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} />
			<Article />
		</main>
	);
};
