import { Search } from "lucide-react";

function RightSideBar() {
    return (
        <aside className="w-1/4 max-w-xs fixed right-0 h-screen p-4">
          <div className="bg-gray-900 rounded-full mb-4">
            <input
              type="text"
              placeholder="Search Twitter"
              className="bg-transparent p-3 pl-12 w-full rounded-full"
            />
            <Search className="absolute top-7 left-7 text-gray-500" />
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h2 className="font-bold text-xl mb-4">What's happening</h2>
            {/* // TODO Add list of random users in this */}
          </div>
        </aside>
    );
}

export default RightSideBar;