import { FaTrash } from "react-icons/fa";
import * as S from "../styles/pages/content";
import { Comment } from "../types";

export default function UserCommentSection({ comments, userId, handleDeleteComment, comment, setComment, handleAddComment }: { comments: Comment[], userId: string, handleDeleteComment: (commentId: string) => void, comment: string, setComment: (comment: string) => void, handleAddComment: () => void }) {
    
  console.log("댓글",comments);
  return (
      <S.UserCommentContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <S.CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <S.CommentAddButton onClick={handleAddComment}>
            댓글 추가
          </S.CommentAddButton>
        </div>
        {comments.map((comment) => (
          <S.UserCommentTextContainer key={comment.id}>
            <S.UserCommentUsername>
              {comment.user.username}
            </S.UserCommentUsername>
            <div style={{ display: "flex", alignItems: "center" }}>
              <S.UserCommentText>{comment.comment} </S.UserCommentText>
              {comment.user_id === userId && (
                <FaTrash
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "white",
                    width: "15px",
                    height: "15px",
                  }}
                  onClick={() => handleDeleteComment(comment.id)}
                />
              )}
            </div>
          </S.UserCommentTextContainer>
        ))}
      </S.UserCommentContainer>
    );
  };