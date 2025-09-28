const Icon = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <span className="text-xl font-medium text-foreground">Company</span>
    </div>
  );
};

export default Icon;
