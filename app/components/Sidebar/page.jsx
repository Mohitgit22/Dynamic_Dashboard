import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">
          Dashboard
        </Link>
        <Link href="/dashboard/settings" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">
          Settings
        </Link>
        <Link href="/dashboard/profile" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">
          Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
