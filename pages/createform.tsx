import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormData {
	title: string;
	description: string;
}

export const CreateForm = () => {
	const [user] = useAuthState(auth);
	const schema = yup.object().shape({
		title: yup.string().required("A title is required"),
		description: yup.string().required("E description is necessary"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFormData>({
		resolver: yupResolver(schema),
	});

	const posts = collection(db, "posts");

	const createPost = async (data: any) => {
		await addDoc(posts, {
			...data,
			username: user?.displayName,
			userId: user?.uid,
		});
		console.log(data);
	};

	return (
		<>
			<form>
				<label htmlFor="title">Title</label>
				<input type="text" {...register("title")} />
				<p style={{ color: "red" }}>{errors.title?.message}</p>

				<label htmlFor="description">Description</label>
				<input type="text" {...register("description")} />
				<p style={{ color: "red" }}>{errors.description?.message}</p>

				<button type="submit" onClick={handleSubmit(createPost)}>
					Post
				</button>
			</form>
		</>
	);
};
