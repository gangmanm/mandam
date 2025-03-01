interface Post  {
  title: string;
  srtFile: File;
  content: string;
  youtubeLink: string;
}

export const createPost = async (post: Post) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("srtFile", post.srtFile);
  formData.append("content", post.content);
  formData.append("youtubeLink", post.youtubeLink);

  const response = await fetch("http://localhost:5017/posts/create-post", {
    method: "POST",
    body: formData,
    mode: "cors",
  });
  return response.json();   
};
