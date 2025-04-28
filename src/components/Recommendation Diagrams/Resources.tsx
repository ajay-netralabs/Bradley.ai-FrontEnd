export const Resources: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
	const isLarge = size === 'large';
    const imageWidth = isLarge ? 1200 : 960;
    const imageHeight = isLarge ? 600 : 480;

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
                src="resources.png"
                alt="Resources"
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
