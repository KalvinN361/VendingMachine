export const MintingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-grayscale z-50">
            <div className="flex items-center justify-center h-full text-white text-4xl">
                Transaction in Process. DO NOT REFRESH OR LEAVE THE PAGE.
            </div>
        </div>
    )
}