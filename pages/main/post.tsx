import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { Post as Ipost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
	post: Ipost;
}

interface Like {
	userId: string;
	likeId: string;
}

export const Post = (props: Props) => {
	const [likes, setLikesNo] = useState<Like[] | null>(null);

	const { post } = props;
	const [user] = useAuthState(auth);
	const likesRef = collection(db, "likes");
	const likesDoc = query(likesRef, where("postId", "==", post.id));
	const liked = likes?.find((like) => like.userId === user?.uid);

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

		setLikesNo(
			data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
		);
	};

	const addLike = async () => {
		try {
			if (user) {
				const newDoc = await addDoc(likesRef, {
					postId: post.id,
					userId: user.uid,
				});
				setLikesNo((prev) =>
					prev
						? [...prev, { userId: user.uid, likeId: newDoc.id }]
						: [{ userId: user.uid, likeId: newDoc.id }]
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeLike = async () => {
		try {
			const deleteLikeDoc = query(
				likesRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			);
			const deleteData = await getDocs(deleteLikeDoc);
			const likeId = deleteData.docs[0].id;
			const likeDelete = doc(db, "likes", likeId);
			await deleteDoc(likeDelete);
			if (user) {
				setLikesNo(
					(prev) => prev && prev.filter((like) => like.likeId !== likeId)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getLikes();
	}, []);

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.description}</p>
			<small>@ {post.username} </small>
			<button onClick={liked ? removeLike : addLike}>
				{liked ? <>&#128078;</> : <>&#128077;</>}
			</button>
			{likes && <small> {likes?.length} likes</small>}
		</div>
	);
};
