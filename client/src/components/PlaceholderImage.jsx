// client/src/components/PlaceholderImage.jsx

const PlaceholderImage = () => {
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-brand-dark flex flex-col items-center justify-center">
      <div className="text-center text-gray-500 dark:text-gray-400">
        {/* You can put your logo here for a more branded look */}
        <p className="text-2xl font-bold text-brand-orange">CBK</p>
        <p className="mt-2 font-semibold">Image Not Available</p>
        <p className="text-xs mt-1">Technical data available</p>
      </div>
    </div>
  );
};

export default PlaceholderImage;
