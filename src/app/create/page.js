"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "topics",
          options
        );
        const result = await res.json();
        // 현재 페이지를 다시 렌더링하거나 새로 고침하는 것을 의미함!
        router.refresh();
        router.push(`/read/${result.id}`);
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
