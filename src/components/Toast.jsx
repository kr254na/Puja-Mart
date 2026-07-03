export default function Toast({ message }) {
  return (
    <div
      className={`fixed bottom-8 left-8 z-50 bg-gradient-to-r from-saffron to-saffron-deep text-white px-5 py-3.5 rounded shadow transition-all duration-500 ${
        message
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}
