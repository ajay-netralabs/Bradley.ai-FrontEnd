export const SystemDiagram: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
	const isLarge = size === 'large';
    const imageWidth = isLarge ? 1200 : 960;
    const imageHeight = isLarge ? 600 : 480;

    return (
				<div
						style={{
					width: isLarge ? '82.5%' : '100%',
					display: 'flex',
					justifyContent: 'center',
						}}
				>
						<img
					src="src\components\Recommendation Diagrams\systemdiagram.png"
					alt="System Diagram"
					width={imageWidth}
					height={imageHeight}
					style={{
							maxWidth: '100%',
							height: 'auto',
					}}
						/>
				</div>
    );
};
