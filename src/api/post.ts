const SETTING = import.meta.env.VITE_SETTING;
const SERVER_URL = SETTING === "dev" ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_SERVER_URL;

interface Post  {
  title: string;
  File: File;
  youtubeUrl: string;
  userId: string;
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
    formData.append("userId", post.userId);
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

export const getPost = async (id: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-post/${id}`, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting post:", error);
    return { success: false, error: error.message };
  }
};

export const getFile = async (filePath: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-file?file_path=${filePath}`, {
      method: "GET",
      mode: "cors",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error getting file:", error);
    return { success: false, error: error.message };
  }
};
export const addComment = async (comment: string, postId: string, userId: string) => {
  console.log(comment, postId, userId);
  try {
    const response = await fetch(`${SERVER_URL}/posts/comment`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json" // Content-Type 헤더 추가
      },
      body: JSON.stringify({ comment, post_id: postId, user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: error.message };
  }
};

export const getComments = async (postId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-comments/${postId}`, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting comments:", error);
    return { success: false, error: error.message };
  }
};

export const likePost = async (postId: string, userId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/like`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json" // Content-Type 헤더 추가
      },
      body: JSON.stringify({ post_id: postId, user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error liking post:", error);
    return { success: false, error: error.message };
  }
};

export const getLike = async (postId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-likes/${postId}`, {
      method: "GET",  
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    } 

    return await response.json();
  } catch (error) {
    console.error("Error getting like:", error);
    return { success: false, error: error.message };
  }
};
