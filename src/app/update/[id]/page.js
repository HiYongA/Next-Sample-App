"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}topics/${id}`
        );
        const topic = await res.json();
        setTitle(topic.title);
        setBody(topic.body);
      } catch (error) {
        console.error("데이터 불러오기 실패", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}topics/` + id,
          options
        );
        const result = await res.json();
        // 현재 페이지를 다시 렌더링하거나 새로 고침하는 것을 의미함!
        router.refresh();
        router.push(`/read/${result.id}`);
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
