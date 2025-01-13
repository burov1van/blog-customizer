import { useState, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { RadioGroup } from 'src/ui/radio-group';
import type { OptionType } from 'src/constants/articleProps';

// Импорт массивов опций и defaultArticleState
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply?: (
		bgColor: string,
		fontFamily: string,
		fontColor: string,
		fontSize: string,
		containerWidth: string
	) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	// === Не вешаем обработчик, если меню закрыто ===
	useEffect(() => {
		if (!isMenuOpen) return;

		function handleClickOutside(event: MouseEvent) {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleToggle = () => setIsMenuOpen(!isMenuOpen);

	// (1) Шрифт
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);

	// (2) Размер шрифта - теперь храним весь объект OptionType
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	// (3) Цвет шрифта
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);

	// (4) Цвет фона
	const [selectedBgColor, setSelectedBgColor] = useState(
		defaultArticleState.backgroundColor
	);

	// (5) Ширина контента
	const [selectedWidth, setSelectedWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply?.(
			selectedBgColor.value,
			selectedFontFamily.value,
			selectedFontColor.value,
			selectedFontSize.value,
			selectedWidth.value
		);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedWidth(defaultArticleState.contentWidth);

		onApply?.(
			defaultArticleState.backgroundColor.value,
			defaultArticleState.fontFamilyOption.value,
			defaultArticleState.fontColor.value,
			defaultArticleState.fontSizeOption.value,
			defaultArticleState.contentWidth.value
		);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<div className={styles.header}>
						<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
							<span className={styles.headerSpan}>Задайте параметры</span>
						</Text>
					</div>

					<div className={styles.fields}>
						<div>
							<Select
								title='Шрифт'
								options={fontFamilyOptions}
								selected={selectedFontFamily}
								onChange={(option) => setSelectedFontFamily(option)}
							/>
						</div>

						{/* 2) РАЗМЕР ШРИФТА - теперь RadioGroup */}
						<div>
							<RadioGroup
								title='Размер шрифта'
								name='fontSize'
								options={fontSizeOptions}
								selected={selectedFontSize}
								onChange={(option) => setSelectedFontSize(option)}
							/>
						</div>

						{/* 3) ЦВЕТ ШРИФТА */}
						<div>
							<Select
								title='Цвет шрифта'
								options={fontColors}
								selected={selectedFontColor}
								onChange={(option) => setSelectedFontColor(option)}
							/>
						</div>

						<Separator />

						{/* 4) ЦВЕТ ФОНА */}
						<div>
							<Select
								title='Цвет фона'
								options={backgroundColors}
								selected={selectedBgColor}
								onChange={(option) => setSelectedBgColor(option)}
							/>
						</div>

						{/* 5) ШИРИНА КОНТЕНТА */}
						<div>
							<Select
								title='Ширина контента'
								options={contentWidthArr}
								selected={selectedWidth}
								onChange={(option) => setSelectedWidth(option)}
							/>
						</div>
					</div>

					<div className={styles.bottomContainer}>
						<div className={styles.buttonWrapper}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
						</div>
						<div className={styles.buttonWrapper}>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</div>
				</form>
			</aside>
		</>
	);
};
