import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<TextControl
				value={ attributes.message }
				onChange={ ( val ) => setAttributes({ message: val } )}
			/>
			<DropZone value={ attributes.url }/>
		</div>
	);
}

export default edit;
