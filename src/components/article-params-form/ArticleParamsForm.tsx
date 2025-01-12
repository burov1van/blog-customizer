import { useState, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

// Импорт массивов опций
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
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
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleToggle = () => setIsOpen(!isOpen);

	// (1) Шрифт
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	// (2) Размер шрифта (только абзацы)
	const [selectedTextSize, setSelectedTextSize] = useState('18px');
	const handleSizeClick = (value: string) => {
		setSelectedTextSize(value);
	};

	// (3) Цвет шрифта
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);

	// (4) Цвет фона
	const [selectedBgColor, setSelectedBgColor] = useState(backgroundColors[0]);

	// (5) Ширина контента
	const [selectedWidth, setSelectedWidth] = useState(contentWidthArr[0]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply?.(
			selectedBgColor.value,
			selectedFontFamily.value,
			selectedFontColor.value,
			selectedTextSize,
			selectedWidth.value
		);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSelectedFontFamily(fontFamilyOptions[0]);
		setSelectedFontColor(fontColors[0]);
		setSelectedTextSize('18px');
		setSelectedBgColor(backgroundColors[0]);
		setSelectedWidth(contentWidthArr[0]);

		onApply?.(
			backgroundColors[0].value,
			fontFamilyOptions[0].value,
			fontColors[0].value,
			'18px',
			contentWidthArr[0].value
		);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<header className={styles.header}>
						<Text size={31} weight={800} uppercase family='open-sans'>
							<span className={styles.headerSpan}>Задайте параметры</span>
						</Text>
					</header>

					<div className={styles.fields}>
						<div>
							<p className={styles.blockTitle}>Шрифт</p>
							<Select
								options={fontFamilyOptions}
								selected={selectedFontFamily}
								onChange={(option) => setSelectedFontFamily(option)}
							/>
						</div>

						<div>
							<p className={styles.blockTitle}>Размер шрифта</p>
							<div className={styles.sizeButtons}>
								<button
									type='button'
									className={clsx(styles.sizeButton, {
										[styles.sizeButtonActive]: selectedTextSize === '18px',
									})}
									onClick={() => handleSizeClick('18px')}>
									18 PX
								</button>
								<button
									type='button'
									className={clsx(styles.sizeButton, {
										[styles.sizeButtonActive]: selectedTextSize === '25px',
									})}
									onClick={() => handleSizeClick('25px')}>
									25 PX
								</button>
								<button
									type='button'
									className={clsx(styles.sizeButton, {
										[styles.sizeButtonActive]: selectedTextSize === '38px',
									})}
									onClick={() => handleSizeClick('38px')}>
									38 PX
								</button>
							</div>
						</div>

						<div>
							<p className={styles.blockTitle}>Цвет шрифта</p>
							<Select
								options={fontColors}
								selected={selectedFontColor}
								onChange={(option) => setSelectedFontColor(option)}
							/>
						</div>

						<Separator />

						<div>
							<p className={styles.blockTitle}>Цвет фона</p>
							<Select
								options={backgroundColors}
								selected={selectedBgColor}
								onChange={(option) => setSelectedBgColor(option)}
							/>
						</div>

						<div>
							<p className={styles.blockTitle}>Ширина контента</p>
							<Select
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
