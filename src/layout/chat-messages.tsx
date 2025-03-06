export default function ChatMessages() {
  return (
    <div className="flex flex-col flex-1 py-4">
      <div className="w-full flex h-max">
        <div className="w-[200px] bg-white p-2 rounded-lg h-max flex flex-col rounded-ss-none shadow-sm">
          <p className="text-sm">Hello there?</p>
          <p className="text-xs font-medium ms-auto text-gray-500">11:00</p>
        </div>
      </div>
      <div className="w-full flex h-max">
        <div className="w-[200px] p-2 rounded-lg h-max flex flex-col rounded-se-none ms-auto shadow-sm bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <p className="text-sm">Hey! How is it going?</p>
          <p className="text-xs font-medium ms-auto text-gray-300">11:00</p>
        </div>
      </div>
    </div>
  );
}
