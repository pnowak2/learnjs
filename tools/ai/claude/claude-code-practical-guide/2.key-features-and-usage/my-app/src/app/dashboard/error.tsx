"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  function handleReset() {
    reset();
  }

  return (
    <main className="p-8">
      <p>Something went wrong: {error.message}</p>
      <button onClick={handleReset}>Try again</button>
    </main>
  );
}
