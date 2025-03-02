
const SETTING = import.meta.env.VITE_SETTING;
const SERVER_URL = SETTING === "dev" ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_SERVER_URL;

interface Post  {
  title: string;
  File: File;
  content: string;
  youtubeUrl: string;
  userId: number;
  text: string;
}

interface Character {
  img: File | null;
  name: string; 
}

export const createPost = async (post: Post) => {
  try {
    console.log(post);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("userId", 5);
    formData.append("text", post.text);
    
    if (post.File instanceof File) {
      formData.append("srtFile", post.File);
    } else {
      console.warn("post.File is not a valid File object.");
    }

    formData.append("content", post.content);
    formData.append("youtube_url", post.youtubeUrl);

    const response = await fetch(`${SERVER_URL}/posts/create-post`, {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    } 

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: error.message };
  }
};

export const createCharacter = async (character: Character, postId: number) => {
  try {
    const formData = new FormData();
    formData.append("img", character.img as File);
    formData.append("name", character.name);
    formData.append("postId", postId.toString());

    const response = await fetch(`${SERVER_URL}/posts/create-character`, {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error creating character:", error);
    return { success: false, error: error.message };
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-posts`, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting posts:", error);
    return { success: false, error: error.message };
  }
};
