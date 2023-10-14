import React from "react";

export default async function Read(props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`,
    {
      cache: "no-cache",
    }
  );
  const topic = await res.json();
  console.log(topic);

  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.body}
    </div>
  );
}
