import { useBlockProps } from '@wordpress/block-editor';

const save = ({attributes}) => {
	console.log({attributes});
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			{attributes.title}
			{attributes.message}
		</div>
	);
}

export default save;
