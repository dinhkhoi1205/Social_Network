
import { api } from "../../config/api";
import { FIND_POST_BY_ID_FAILURE, FIND_POST_BY_ID_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, POST_CREATE_FAILURE, POST_CREATE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_SUCCESS, REPLY_POST_FAILURE, REPLY_POST_SUCCESS, REPOST_FAILURE, REPOST_SUCCESS, USER_LIKE_POST_FAILURE, USER_LIKE_POST_REQUEST, USER_LIKE_POST_SUCCESS } from "./ActionType";


export const getAllPosts=()=>async(dispatch)=>{

    try {
        const {data}=await api.get("/api/posts");
        console.log("get all post:", data)
        dispatch({type:GET_ALL_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:GET_ALL_POST_FAILURE,payload:error.message})
    }

}

export const getUserPost=(userId)=>async(dispatch)=>{

    try {
        const {data}=await api.get(`/api/posts/user/${userId}`);
        console.log("get user post:", data)
        dispatch({type:GET_USERS_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:GET_USERS_POST_FAILURE,payload:error.message})
    }

}

export const findPostByLikeContaineUser=(userId)=>async(dispatch)=>{

    try {
        const {data}=await api.get(`/api/posts/user/${userId}/likes`);
        console.log("user like post:", data)
        dispatch({type:USER_LIKE_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:USER_LIKE_POST_FAILURE,payload:error.message})
    }

}

export const findPostById=(postId)=>async(dispatch)=>{

    dispatch({type: "FIND_POST_BY_ID_REQUEST"});
    try {
        const {data}=await api.get(`/api/posts/${postId}`);;
        console.log("find post by id:", data)
        dispatch({type:FIND_POST_BY_ID_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:FIND_POST_BY_ID_FAILURE,payload:error.message})
    }

}

export const createPost=(postData)=>async(dispatch)=>{

    try {
        const {data}=await api.post(`/api/posts/create`, postData);
        console.log("Create post:", data)
        dispatch({type:POST_CREATE_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:POST_CREATE_FAILURE,payload:error.message})
    }

}

export const createPostReply=(postData)=>async(dispatch)=>{

    try {
        const {data}=await api.post(`/api/posts/reply`, postData);
        console.log("Reply post:", data)
        dispatch({type:REPLY_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:REPLY_POST_FAILURE,payload:error.message})
    }

}

export const createRePost=(postId)=>async(dispatch)=>{

    try {
        const {data}=await api.put(`/api/posts/${postId}/repost`);
        console.log("Repost:", data)
        dispatch({type:REPOST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:REPOST_FAILURE,payload:error.message})
    }

}

export const likePost=(postId)=>async(dispatch)=>{

    try {
        const token = localStorage.getItem("token");
        const {data}=await api.post(`/api/posts/${postId}/likes`, 
            {},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("Like:", data)
        dispatch({type:LIKE_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:LIKE_POST_FAILURE,payload:error.message})
    }
}


export const deletePost=(postId)=>async(dispatch)=>{

    try {
        const {data}=await api.delete(`/api/posts/${postId}`);
        console.log("Delete post:", data)
        dispatch({type:POST_DELETE_SUCCESS, payload:postId})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:POST_DELETE_FAILURE,payload:error.message})
    }

}