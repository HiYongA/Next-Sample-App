"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={async () => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}topics/` + id,
                  {
                    method: "DELETE",
                  }
                );
                await res.json();
                // 현재 페이지를 다시 렌더링하거나 새로 고침하는 것을 의미함!
                router.push("/");
                router.refresh();
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
