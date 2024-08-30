export default function Button({ children }) {
  return (
    <button className="bg-indigo-600 text-white px-6 py-1 text-center rounded-xl">
      {children}
    </button>
  );
}
