import * as React from "react";

interface FloatingLabelIProps {
	id?: string,
	labelId?: string,
	inputId?: string,
	onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
	onBlur?: (event: React.FormEvent<HTMLInputElement>) => void,
	onFocus?: (event: React.FormEvent<HTMLInputElement>) => void,
	onChangeDelay?: number,
	className?: string,
	labelClassName?: string,
	inputClassName?: string,
	type?: string,
	label?: string,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	inputStyle?: React.CSSProperties,
	loadingCog?: boolean,
	loadingCogSpinning?: boolean,
	loadingCogSize?: number,
	loadingCogStyle?: React.CSSProperties,
	initialValue?: string
}
interface FloatingLabelIState {
	isActive: boolean,
	text: string,
	id: string,
	cogId: string,
	labelId: string,
	inputId: string,
	queuedChangeTimeout: number | undefined
}

interface LoadingCogIProps{
	style?: React.CSSProperties,
	size?: number,
	rotating?: boolean,
	id?: string
}

interface LoadingCogIState{
	rotateInterval?: number,
	id: string,
	rot: number
}

declare module 'react-bootstrap-floating-label' {
	export default class FloatingLabel extends React.Component<FloatingLabelIProps, FloatingLabelIState>{
		public constructor(props: FloatingLabelIProps);
		public handleTextChange(event: React.FormEvent<HTMLInputElement>, force?: boolean): void;
		public componentDidUpdate(prevProps: FloatingLabelIProps): void;
	}
	export class LoadingCog extends React.Component<LoadingCogIProps, LoadingCogIState>{
		public constructor(props: LoadingCogIProps);
		public triggerRotate(): void;
	}
}
