interface Post  {
  title: string;
  File: File;
  content: string;
  youtubeUrl: string;
  userId: string;
  text: string;
  characters: { img: File; name: string }[];
}

export const createPost = async (post: Post) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("user_id", post.userId);
  formData.append("text", post.text);
  formData.append("file_path", post.File);
  formData.append("content", post.content);
  formData.append("youtube_url", post.youtubeUrl);
  formData.append("characters", JSON.stringify(post.characters));

  const response = await fetch("http://localhost:5017/posts/create-post", {
    method: "POST",
    body: formData,
    mode: "cors",
  });
  return response.json();   
};
