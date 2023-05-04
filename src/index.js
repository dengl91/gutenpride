import { useState } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, DropZone, Button, Placeholder } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './style.scss';
import './editor.scss';

import metadata from './block.json';

const edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const { imageUrl, altText, hasDropped } = attributes;
	const [ isDragging, setIsDragging ] = useState( false );

	const onDrop = (files) => {
		const file = files[0];
		const data = new FormData();
		data.append('file', file);
		setAttributes({
			imageUrl: media.url,
			hasDropped: true
		});
	};

	const onSelectImage = (media) => {
		console.log(media)
		setAttributes({
			imageUrl: media.url,
			altText: media.alt,
		});
	};

	const placeholder = () => {
		return (
			<Placeholder
				label={ __( 'Image' ) }
				instructions={ __(
					'Upload an image file, pick one from your media library, or add one with a URL.'
				) }
			>
			</Placeholder>
		);
	};

	const mediaPreview = () => (
		<img
			alt={ __( 'Edit image' ) }
			title={ __( 'Edit image' ) }
			className={ 'edit-image-preview' }
			src={ url }
		/>
	);

	return (
		<div {...blockProps}>
			<TextControl
				value={attributes.message}
				onChange={(val) => setAttributes({ message: val })}
			/>
			<MediaUploadCheck>
			{ hasDropped ? 'Dropped!' : 'Drop something here' }
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes={ ['image'] }
					value={imageUrl}
					render={({ open }) => (
						<Button onClick={open}>
							{imageUrl ? 'Replace Image' : 'Select Image'}
						</Button>
					)}
				/>
				<MediaPlaceholder
					onSelect={ onSelectImage }
					placeholder={ placeholder }
					accept="image/*"
					mediaPreview={ mediaPreview }
					disableMediaButtons={ false }
				/>
			</MediaUploadCheck>
			<img src={imageUrl} alt={altText} />
		</div>
	);
}

const save = ({ attributes }) => {
	const blockProps = useBlockProps.save();
	const { imageUrl, altText } = attributes;

	return (
		<div {...blockProps}>
			{attributes.message}
			<img src={imageUrl} alt={altText} />
		</div>
	);
}

registerBlockType(metadata.name, {
	example: {
		attributes: {
			message: 'Gutenpride',
		},
	},
	edit,
	save
});
