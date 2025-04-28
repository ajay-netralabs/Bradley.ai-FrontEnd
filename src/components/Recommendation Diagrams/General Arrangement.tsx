export const GeneralArrangement: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
	const isLarge = size === 'large';
    const imageWidth = isLarge ? 1000 : 960;
    const imageHeight = isLarge ? 500 : 480;

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
                src="generalarrangement.png"
                alt="General Arrangement"
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
