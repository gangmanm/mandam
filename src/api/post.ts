import { AutoSave, Post, Character } from "../types";

const SETTING = import.meta.env.VITE_SETTING;
const SERVER_URL = SETTING === "dev" ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_SERVER_URL;

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

    formData.append("content", post.content as string);
    formData.append("youtube_url", post.youtubeUrl as string);

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
    if (error instanceof Error) {
      console.error("Error creating character:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error creating character:", error);
      return { success: false, error: "Unknown error occurred" };
    }
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
    if (error instanceof Error) {
      console.error("Error getting posts:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error getting posts:", error);
      return { success: false, error: "Unknown error occurred" };
    }
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
    if (error instanceof Error) {
      console.error("Error getting post:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error getting post:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};

export const getFile = async (filePath: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-file?file_path=${filePath}`, {
      method: "GET",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting file:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error getting file:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};
export const addComment = async (comment: string, postId: string, userId: string) => {
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
    if (error instanceof Error) {
      console.error("Error adding comment:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error adding comment:", error);
      return { success: false, error: "Unknown error occurred" };
    }
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
    if (error instanceof Error) {
      console.error("Error getting comments:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error getting comments:", error);
      return { success: false, error: "Unknown error occurred" };
    }
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
    if (error instanceof Error) {
      console.error("Error liking post:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error liking post:", error);
      return { success: false, error: "Unknown error occurred" };
    }
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
    if (error instanceof Error) {
      console.error("Error getting like:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error getting like:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};


export const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/delete-comment`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment_id: commentId })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting comment:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error deleting comment:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};


export const deletePost = async (postId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/delete-post`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post_id: postId })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting post:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error deleting post:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};  


export const editPost = async (post: Post) => {
  console.log("Sending post data:", post);

  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("userId", post.userId);
  formData.append("text", post.text);
  formData.append("post_id", post.id as string);
  formData.append("youtube_url", post.youtubeUrl as string);
  
  // File이 존재할 경우에만 추가
  if (post.File instanceof File) {
    formData.append("srtFile", post.File); // "File"에서 "srtFile"로 변경
  }

  try {
    const response = await fetch(`${SERVER_URL}/posts/edit-post`, {
      method: "POST",
      body: formData
    });

    // 응답 상태 로깅
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server responded with ${response.status}`);
    }

    const result = await response.json();
    console.log("Response data:", result);
    return result;

  } catch (error) {
    console.error("Error details:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};


export const deleteCharacter = async (id: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/delete-character`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ character_id: id })
    });


    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting character:", error);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error deleting character:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};

export const editCharacter = async (character: Character) => {
  try {
    const formData = new FormData();
    formData.append("character_id", character.id as string);
    formData.append("name", character.name);
    formData.append("img", character.img as File);

    const response = await fetch(`${SERVER_URL}/posts/edit-character`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing character:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};






export const autoSavePost = async (autoSave: AutoSave) => {
  try {
    const formData = new FormData();
    formData.append("file_name", autoSave.fileName );
    formData.append("uuid", autoSave.userId);
    formData.append("file", autoSave.File);
    
    const response = await fetch(`${SERVER_URL}/posts/auto-save-file`, {
      method: "POST",
      mode: "cors",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);  
    }

    return await response.json();
  } catch (error) {
    console.error("Error auto saving post:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const getAutoSave = async (userId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/get-auto-save-file`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: userId
      })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting auto save:", error);   
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};  