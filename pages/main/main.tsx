import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
	id: string;
	userId: string;
	title: string;
	username: string;
	description: string;
}
export default function Main() {
	const posts = collection(db, "posts");

	const [postList, setPostList] = useState<Post[] | null>(null);

	const getPosts = async () => {
		try {
			const data = await getDocs(posts);
			setPostList(
				data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as Post[]
			);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<section>
			{postList?.map((post) => (
				<Post post={post} />
			))}
		</section>
	);
}
